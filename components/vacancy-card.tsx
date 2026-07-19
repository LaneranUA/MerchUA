import Link from "next/link";

import { ArrowRightIcon, ClockIcon, MapPinIcon, TelegramIcon, WalletIcon } from "@/components/icons";
import { buildVacancyPath, formatDateTime, formatEmploymentType, formatSalaryRange } from "@/lib/format";
import type { VacancyListItem } from "@/lib/vacancies";

type VacancyCardProps = {
  vacancy: VacancyListItem;
};

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const salary = formatSalaryRange(vacancy.salaryMin, vacancy.salaryMax, vacancy.salaryCurrency);
  const employmentType = formatEmploymentType(vacancy.employmentType);

  return (
    <article className="vacancy-card">
      <div className="vacancy-card__top">
        <div>
          <p className="vacancy-card__company">{vacancy.company ?? "Компанія не вказана"}</p>
          <h3 className="vacancy-card__title">
            <Link href={buildVacancyPath(vacancy.slug)}>{vacancy.title}</Link>
          </h3>
        </div>

        {vacancy.sourceChannel ? (
          <div className="source-badge">
            <TelegramIcon className="source-badge__icon" />
            <span>{vacancy.sourceChannel}</span>
          </div>
        ) : null}
      </div>

      <div className="vacancy-meta">
        <span>
          <MapPinIcon className="meta-icon" />
          {vacancy.location}
        </span>
        {employmentType ? (
          <span>
            <ClockIcon className="meta-icon" />
            {employmentType}
          </span>
        ) : null}
      </div>

      <p className="vacancy-card__excerpt">{vacancy.excerpt}</p>

      <div className="vacancy-card__bottom">
        <div>
          {salary ? (
            <span className="salary-value">
              <WalletIcon className="meta-icon" />
              {salary}
            </span>
          ) : (
            <span className="salary-placeholder">Зарплата не вказана</span>
          )}
        </div>

        <span className="vacancy-card__time">
          <ClockIcon className="meta-icon" />
          {formatDateTime(vacancy.publishedAt)}
        </span>
      </div>

      {vacancy.tgMessageUrl ? (
        <a
          className="vacancy-card__cta"
          href={vacancy.tgMessageUrl}
          rel="noreferrer"
          target="_blank"
        >
          Детальніше
          <ArrowRightIcon className="cta-icon" />
        </a>
      ) : (
        <Link className="vacancy-card__cta" href={buildVacancyPath(vacancy.slug)}>
          Детальніше
          <ArrowRightIcon className="cta-icon" />
        </Link>
      )}
    </article>
  );
}
