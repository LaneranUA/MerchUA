import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/markdown-content";
import { BriefcaseIcon, ClockIcon, MapPinIcon, TelegramIcon, WalletIcon } from "@/components/icons";
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
    <section className="section">
      <div className="container">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting) }}
          type="application/ld+json"
        />

        <div className="detail-backlink">
          <Link href="/">← Назад до всіх вакансій</Link>
        </div>

        <div className="vacancy-detail">
          <article className="detail-card">
            <p className="eyebrow">Окрема SEO-сторінка вакансії</p>
            <h1>{vacancy.title}</h1>

            <div className="detail-meta">
              <span>
                <BriefcaseIcon className="meta-icon" />
                {vacancy.company ?? "Компанія не вказана"}
              </span>
              <span>
                <MapPinIcon className="meta-icon" />
                {vacancy.location}
              </span>
              <span>
                <ClockIcon className="meta-icon" />
                {employmentType ?? "Формат не вказано"}
              </span>
              {salary ? (
                <span className="salary-value">
                  <WalletIcon className="meta-icon" />
                  {salary}
                </span>
              ) : null}
            </div>

            <MarkdownContent content={vacancy.description} />
          </article>

          <aside className="detail-sidebar">
            <div className="detail-panel">
              <h2>Коротко</h2>
              <dl className="detail-facts">
                <div>
                  <dt>Опубліковано</dt>
                  <dd>{formatDate(vacancy.publishedAt)}</dd>
                </div>
                {vacancy.expiresAt ? (
                  <div>
                    <dt>Актуально до</dt>
                    <dd>{formatDate(vacancy.expiresAt)}</dd>
                  </div>
                ) : null}
                {vacancy.category ? (
                  <div>
                    <dt>Категорія</dt>
                    <dd>{vacancy.category}</dd>
                  </div>
                ) : null}
                {vacancy.sourceChannel ? (
                  <div>
                    <dt>Джерело</dt>
                    <dd className="inline-icon">
                      <TelegramIcon className="meta-icon" />
                      {vacancy.sourceChannel}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            {vacancy.blueskyUri ? (
              <div className="detail-panel">
                <h2>Bluesky</h2>
                <p className="small-copy">{vacancy.blueskyUri}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
