import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { hasValidApiKey, unauthorizedResponse } from "@/lib/auth";
import { buildVacancyUrl } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { createVacancySlug } from "@/lib/slug";
import { vacancyCreateSchema } from "@/lib/validation/vacancy";
import { getVacancyTag, getVacancies, VACANCIES_TAG } from "@/lib/vacancies";

function isDuplicateTgMessageId(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002" &&
    Array.isArray(error.meta?.target) &&
    error.meta?.target.includes("tgMessageId")
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const category = searchParams.get("category")?.trim() || undefined;
  const q = searchParams.get("q")?.trim() || undefined;

  try {
    const result = await getVacancies({
      page: Number.isFinite(page) ? page : 1,
      limit: Number.isFinite(limit) ? Math.min(50, limit) : 20,
      category,
      q
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/vacancies failed", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!hasValidApiKey(request)) {
    return unauthorizedResponse();
  }

  let tgMessageId: string | undefined;

  try {
    const body = await request.json();
    const parsed = vacancyCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    tgMessageId = parsed.data.tgMessageId;

    const created = await prisma.vacancy.create({
      data: {
        ...parsed.data,
        slug: `draft-${crypto.randomUUID()}`
      }
    });

    const slug = createVacancySlug(created.title, created.id);
    const vacancy = await prisma.vacancy.update({
      where: { id: created.id },
      data: { slug }
    });

    revalidateTag(VACANCIES_TAG);
    revalidateTag(getVacancyTag(vacancy.slug));

    return NextResponse.json(
      {
        status: "created",
        id: vacancy.id,
        slug: vacancy.slug,
        url: buildVacancyUrl(vacancy.slug)
      },
      { status: 201 }
    );
  } catch (error) {
    if (isDuplicateTgMessageId(error) && tgMessageId) {
      const existing = await prisma.vacancy.findUnique({
        where: { tgMessageId },
        select: { id: true, slug: true }
      });

      if (existing) {
        return NextResponse.json({
          status: "duplicate",
          id: existing.id,
          slug: existing.slug
        });
      }
    }

    console.error("POST /api/vacancies failed", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
