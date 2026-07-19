import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const vacancies = await prisma.vacancy.findMany({
    where: {
      isActive: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
    },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, updatedAt: true }
  });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1
    },
    ...vacancies.map((vacancy) => ({
      url: `${siteUrl}/vacancies/${vacancy.slug}`,
      lastModified: vacancy.updatedAt,
      changeFrequency: "hourly" as const,
      priority: 0.8
    }))
  ];
}
