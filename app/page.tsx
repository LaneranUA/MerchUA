import { CategoryFilters } from "@/components/category-filters";
import { Hero } from "@/components/hero";
import { Pagination } from "@/components/pagination";
import { VacancyGrid } from "@/components/vacancy-grid";
import { getVacancyCategories, getVacancies } from "@/lib/vacancies";

export const revalidate = 300;

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number.parseInt(getSingleValue(resolvedParams?.page) ?? "1", 10);
  const category = getSingleValue(resolvedParams?.category)?.trim() || undefined;
  const q = getSingleValue(resolvedParams?.q)?.trim() || undefined;

  const [vacancies, categories] = await Promise.all([
    getVacancies({ page: Number.isFinite(page) ? page : 1, limit: 15, category, q }),
    getVacancyCategories()
  ]);

  return (
    <>
      <Hero categoriesCount={categories.length} q={q} category={category} totalVacancies={vacancies.total} />

      <section className="py-section-padding px-margin-mobile max-w-container-max mx-auto" id="about">
        <CategoryFilters />

        <p className="font-body-sm text-body-sm text-text-secondary mb-stack-lg" aria-live="polite">
          Знайдено вакансій: {vacancies.total}
        </p>

        <VacancyGrid vacancies={vacancies.items} />

        <Pagination category={category} page={vacancies.page} q={q} totalPages={vacancies.totalPages} />
      </section>
    </>
  );
}
