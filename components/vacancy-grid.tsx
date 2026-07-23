import { RevealInit } from "@/components/reveal-init";
import { VacancyCard } from "@/components/vacancy-card";
import type { VacancyListItem } from "@/lib/vacancies";

type VacancyGridProps = {
  vacancies: VacancyListItem[];
};

export function VacancyGrid({ vacancies }: VacancyGridProps) {
  if (vacancies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 gap-stack-md">
        <span className="material-symbols-outlined !text-5xl text-outline">search_off</span>
        <h2 className="font-headline-sm text-headline-sm text-text-primary">Нічого не знайдено</h2>
        <p className="font-body-md text-body-md text-text-secondary max-w-sm">
          Спробуй інші ключові слова або обери іншу категорію.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
      <RevealInit />
      {vacancies.map((vacancy, index) => (
        <VacancyCard index={index} key={vacancy.id} vacancy={vacancy} />
      ))}
    </div>
  );
}
