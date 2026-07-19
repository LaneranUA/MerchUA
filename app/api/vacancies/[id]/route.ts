import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { hasValidApiKey, unauthorizedResponse } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { vacancyPatchSchema } from "@/lib/validation/vacancy";
import { getVacancyTag, VACANCIES_TAG } from "@/lib/vacancies";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteProps) {
  if (!hasValidApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const parsed = vacancyPatchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const resolved = await params;
    const vacancy = await prisma.vacancy.update({
      where: { id: resolved.id },
      data: { blueskyUri: parsed.data.blueskyUri },
      select: { id: true, slug: true, blueskyUri: true }
    });

    revalidateTag(VACANCIES_TAG);
    revalidateTag(getVacancyTag(vacancy.slug));

    return NextResponse.json({
      status: "updated",
      id: vacancy.id,
      slug: vacancy.slug,
      blueskyUri: vacancy.blueskyUri
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Vacancy not found" }, { status: 404 });
    }

    console.error("PATCH /api/vacancies/[id] failed", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
