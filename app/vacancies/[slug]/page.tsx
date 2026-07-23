import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/markdown-content";
import {
  buildVacancyPath,
  buildVacancyUrl,
  formatDate,
  formatEmploymentType,
  formatSalaryRange,
  stripMarkdown,
  truncateText
} from "@/lib/format";
import { getVacancyBySlug } from "@/lib/vacancies";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function loadVacancy(params: PageProps["params"]) {
  const resolved = await params;
  const vacancy = await getVacancyBySlug(resolved.slug);

  if (!vacancy) {
    notFound();
  }

  return vacancy;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vacancy = await loadVacancy(params);
  const description = truncateText(stripMarkdown(vacancy.description), 160);

  return {
    title: `${vacancy.title} — ${vacancy.company ?? "вакансія у Львові"}`,
    description,
    alternates: {
      canonical: buildVacancyPath(vacancy.slug)
    },
    openGraph: {
      title: `${vacancy.title} — ${vacancy.company ?? "MerchUA"}`,
      description,
      type: "article",
      url: buildVacancyUrl(vacancy.slug)
    }
  };
}

export default async function VacancyPage({ params }: PageProps) {
  const vacancy = await loadVacancy(params);
  const salary = formatSalaryRange(vacancy.salaryMin, vacancy.salaryMax, vacancy.salaryCurrency);
  const employmentType = formatEmploymentType(vacancy.employmentType);
  const plainDescription = stripMarkdown(vacancy.description);

  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: vacancy.title,
    description: plainDescription,
    datePosted: vacancy.publishedAt,
    hiringOrganization: {
      "@type": "Organization",
      name: vacancy.company ?? "Компанія не вказана"
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: vacancy.location,
        addressCountry: "UA"
      }
    },
    employmentType: vacancy.employmentType ?? undefined,
    validThrough: vacancy.expiresAt ?? undefined,
    baseSalary: salary
      ? {
          "@type": "MonetaryAmount",
          currency: vacancy.salaryCurrency ?? "UAH",
          value: {
            "@type": "QuantitativeValue",
            minValue: vacancy.salaryMin ?? undefined,
            maxValue: vacancy.salaryMax ?? undefined,
            unitText: "MONTH"
          }
        }
      : undefined
  };

  return (
    <section className="max-w-3xl mx-auto px-margin-mobile py-section-padding">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting) }} type="application/ld+json" />

      <Link
        className="inline-flex items-center gap-1 text-primary font-label-md text-label-md mb-stack-lg hover:underline"
        href="/"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Усі вакансії
      </Link>

      <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-stack-lg md:p-8">
        <div className="flex justify-between items-start mb-4">
          <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">
            {vacancy.company ?? "Компанія не вказана"}
          </span>
          {vacancy.sourceChannel ? (
            <div className="flex items-center gap-1 px-2 py-1 bg-secondary-container/30 text-primary-container rounded-md text-[10px] font-bold">
              <span className="material-symbols-outlined text-[14px]">send</span>
              {vacancy.sourceChannel}
            </div>
          ) : null}
        </div>

        <h1 className="font-headline-lg text-headline-lg text-text-primary mb-stack-md">{vacancy.title}</h1>

        <div className="flex flex-wrap gap-stack-lg mb-stack-lg">
          <div className="flex items-center text-text-secondary font-body-md text-body-md">
            <span className="material-symbols-outlined mr-2 text-outline">location_on</span>
            {vacancy.location}
          </div>
          {employmentType ? (
            <div className="flex items-center text-text-secondary font-body-md text-body-md">
              <span className="material-symbols-outlined mr-2 text-outline">schedule</span>
              {employmentType}
            </div>
          ) : null}
        </div>

        <p className="font-headline-md text-headline-md text-salary-green mb-stack-lg">
          {salary ?? "За домовленістю"}
        </p>

        <div className="border-t border-surface-border pt-stack-lg">
          <MarkdownContent content={vacancy.description} />
        </div>

        <div className="mt-stack-lg pt-stack-lg border-t border-surface-border flex flex-wrap items-center gap-stack-md">
          <span className="font-body-sm text-body-sm text-outline">Опубліковано {formatDate(vacancy.publishedAt)}</span>
          {vacancy.expiresAt ? (
            <span className="font-body-sm text-body-sm text-outline">Актуально до {formatDate(vacancy.expiresAt)}</span>
          ) : null}
          {vacancy.blueskyUri ? (
            <a
              className="inline-flex items-center gap-1 text-primary-container font-label-md text-label-md hover:underline"
              href={vacancy.blueskyUri}
              rel="noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">cloud</span>
              Дивитись у Bluesky
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
