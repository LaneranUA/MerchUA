import Link from "next/link";

import { buildVacancyPath, formatEmploymentType, formatRelativeTime, formatSalaryRange } from "@/lib/format";
import type { VacancyListItem } from "@/lib/vacancies";

type VacancyCardProps = {
  vacancy: VacancyListItem;
  index: number;
};

export function VacancyCard({ vacancy, index }: VacancyCardProps) {
  const salary = formatSalaryRange(vacancy.salaryMin, vacancy.salaryMax, vacancy.salaryCurrency);
  const employmentType = formatEmploymentType(vacancy.employmentType);

  return (
    <Link
      className="reveal group block h-full bg-surface-container-lowest border border-surface-border rounded-xl p-stack-lg hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all"
      href={buildVacancyPath(vacancy.slug)}
      style={{ transitionDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">
          {vacancy.company ?? "MerchUA"}
        </span>
        {vacancy.sourceChannel ? (
          <div className="flex items-center gap-1 px-2 py-1 bg-secondary-container/30 text-primary-container rounded-md text-[10px] font-bold shrink-0">
            <span className="material-symbols-outlined text-[14px]">send</span>
            {vacancy.sourceChannel}
          </div>
        ) : null}
      </div>

      <h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:underline">{vacancy.title}</h3>

      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center text-text-secondary font-body-sm text-body-sm">
          <span className="material-symbols-outlined mr-2 text-outline text-[18px]">location_on</span>
          {vacancy.location}
        </div>
        {employmentType ? (
          <div className="flex items-center text-text-secondary font-body-sm text-body-sm">
            <span className="material-symbols-outlined mr-2 text-outline text-[18px]">schedule</span>
            {employmentType}
          </div>
        ) : null}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-surface-border">
        <span className="font-headline-sm text-headline-sm text-salary-green">{salary ?? "За домовленістю"}</span>
        <span className="font-body-sm text-body-sm text-outline">{formatRelativeTime(vacancy.publishedAt)}</span>
      </div>
    </Link>
  );
}
