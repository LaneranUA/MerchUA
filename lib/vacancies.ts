import { unstable_cache } from "next/cache";
import { Prisma } from "@prisma/client";

import { stripMarkdown, truncateText } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const VACANCIES_REVALIDATE_SECONDS = 300;
export const VACANCIES_TAG = "vacancies";

export type VacancyListItem = {
  id: string;
  slug: string;
  title: string;
  company: string | null;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  employmentType: string | null;
  category: string | null;
  sourceChannel: string | null;
  tgMessageUrl: string | null;
  publishedAt: string;
  expiresAt: string | null;
  excerpt: string;
};

export type VacancyDetail = VacancyListItem & {
  description: string;
  blueskyUri: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  tgMessageId: string;
};

export type VacancyPageResult = {
  items: VacancyListItem[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
};

export function getVacancyTag(slug: string): string {
  return `vacancy:${slug}`;
}

type VacancyFilters = {
  page?: number;
  limit?: number;
  category?: string;
  q?: string;
};

function serializeListItem(
  vacancy: Prisma.VacancyGetPayload<{
    select: {
      id: true;
      slug: true;
      title: true;
      company: true;
      description: true;
      location: true;
      salaryMin: true;
      salaryMax: true;
      salaryCurrency: true;
      employmentType: true;
      category: true;
      sourceChannel: true;
      tgMessageUrl: true;
      publishedAt: true;
      expiresAt: true;
    };
  }>
): VacancyListItem {
  return {
    id: vacancy.id,
    slug: vacancy.slug,
    title: vacancy.title,
    company: vacancy.company,
    location: vacancy.location,
    salaryMin: vacancy.salaryMin,
    salaryMax: vacancy.salaryMax,
    salaryCurrency: vacancy.salaryCurrency,
    employmentType: vacancy.employmentType,
    category: vacancy.category,
    sourceChannel: vacancy.sourceChannel,
    tgMessageUrl: vacancy.tgMessageUrl,
    publishedAt: vacancy.publishedAt.toISOString(),
    expiresAt: vacancy.expiresAt?.toISOString() ?? null,
    excerpt: truncateText(stripMarkdown(vacancy.description), 180)
  };
}

function serializeDetail(
  vacancy: Prisma.VacancyGetPayload<{
    select: {
      id: true;
      slug: true;
      title: true;
      company: true;
      description: true;
      location: true;
      salaryMin: true;
      salaryMax: true;
      salaryCurrency: true;
      employmentType: true;
      category: true;
      sourceChannel: true;
      tgMessageUrl: true;
      publishedAt: true;
      expiresAt: true;
      blueskyUri: true;
      isActive: true;
      createdAt: true;
      updatedAt: true;
      tgMessageId: true;
    };
  }>
): VacancyDetail {
  return {
    ...serializeListItem(vacancy),
    description: vacancy.description,
    blueskyUri: vacancy.blueskyUri,
    isActive: vacancy.isActive,
    createdAt: vacancy.createdAt.toISOString(),
    updatedAt: vacancy.updatedAt.toISOString(),
    tgMessageId: vacancy.tgMessageId
  };
}

function buildWhere(filters: Pick<VacancyFilters, "category" | "q">): Prisma.VacancyWhereInput {
  const where: Prisma.VacancyWhereInput = {
    isActive: true,
    OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
  };

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.q) {
    where.AND = [
      {
        OR: [
          { title: { contains: filters.q } },
          { company: { contains: filters.q } },
          { category: { contains: filters.q } },
          { description: { contains: filters.q } }
        ]
      }
    ];
  }

  return where;
}

export async function getVacancies(filters: VacancyFilters = {}): Promise<VacancyPageResult> {
  const page = Math.max(1, filters.page ?? 1);
  const limit = Math.min(50, Math.max(1, filters.limit ?? 20));
  const category = filters.category?.trim() || undefined;
  const q = filters.q?.trim() || undefined;

  return unstable_cache(
    async () => {
      const where = buildWhere({ category, q });
      const [items, total] = await prisma.$transaction([
        prisma.vacancy.findMany({
          where,
          orderBy: { publishedAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
          select: {
            id: true,
            slug: true,
            title: true,
            company: true,
            description: true,
            location: true,
            salaryMin: true,
            salaryMax: true,
            salaryCurrency: true,
            employmentType: true,
            category: true,
            sourceChannel: true,
            tgMessageUrl: true,
            publishedAt: true,
            expiresAt: true
          }
        }),
        prisma.vacancy.count({ where })
      ]);

      return {
        items: items.map(serializeListItem),
        total,
        page,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        limit
      };
    },
    ["vacancies", String(page), String(limit), category ?? "all", q ?? ""],
    { revalidate: VACANCIES_REVALIDATE_SECONDS, tags: [VACANCIES_TAG] }
  )();
}

export async function getVacancyBySlug(slug: string): Promise<VacancyDetail | null> {
  return unstable_cache(
    async () => {
      const vacancy = await prisma.vacancy.findFirst({
        where: {
          slug,
          isActive: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
        },
        select: {
          id: true,
          slug: true,
          title: true,
          company: true,
          description: true,
          location: true,
          salaryMin: true,
          salaryMax: true,
          salaryCurrency: true,
          employmentType: true,
          category: true,
          sourceChannel: true,
          tgMessageUrl: true,
          publishedAt: true,
          expiresAt: true,
          blueskyUri: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          tgMessageId: true
        }
      });

      return vacancy ? serializeDetail(vacancy) : null;
    },
    ["vacancy", slug],
    { revalidate: VACANCIES_REVALIDATE_SECONDS, tags: [VACANCIES_TAG, getVacancyTag(slug)] }
  )();
}

export async function getVacancyCategories(): Promise<string[]> {
  return unstable_cache(
    async () => {
      const categories = await prisma.vacancy.findMany({
        where: {
          isActive: true,
          category: { not: null },
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
        },
        select: { category: true },
        distinct: ["category"],
        orderBy: { category: "asc" }
      });

      return categories
        .map((entry) => entry.category)
        .filter((category): category is string => Boolean(category));
    },
    ["vacancy-categories"],
    { revalidate: VACANCIES_REVALIDATE_SECONDS, tags: [VACANCIES_TAG] }
  )();
}

export async function getAllActiveVacancySlugs(): Promise<Array<{ slug: string; updatedAt: string }>> {
  return unstable_cache(
    async () => {
      const items = await prisma.vacancy.findMany({
        where: {
          isActive: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
        },
        orderBy: { publishedAt: "desc" },
        select: { slug: true, updatedAt: true }
      });

      return items.map((item) => ({
        slug: item.slug,
        updatedAt: item.updatedAt.toISOString()
      }));
    },
    ["vacancy-sitemap"],
    { revalidate: VACANCIES_REVALIDATE_SECONDS, tags: [VACANCIES_TAG] }
  )();
}
