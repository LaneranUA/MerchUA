import { CategoryFilters } from "@/components/category-filters";
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
      <section className="hero">
        <div className="container hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">MerchUA</p>
            <h1>Знайди роботу у Львові швидко, структуровано й без шуму.</h1>
            <p className="hero-text">
              Свіжі вакансії для мерчендайзерів з перевірених джерел — в одному зручному місці,
              без реєстрацій і зайвого спаму.
            </p>

            <form action="/" className="search-form" method="get">
              <label className="sr-only" htmlFor="q">
                Пошук вакансій
              </label>
              <input
                defaultValue={q}
                id="q"
                name="q"
                placeholder="Посада, компанія або категорія"
                type="search"
              />
              {category ? <input name="category" type="hidden" value={category} /> : null}
              <button className="button" type="submit">
                Знайти вакансії
              </button>
            </form>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>{vacancies.total}</strong>
                <span>активних вакансій</span>
              </div>
              <div className="hero-stat">
                <strong>{categories.length || "∞"}</strong>
                <span>категорій</span>
              </div>
              <div className="hero-stat">
                <strong>24/7</strong>
                <span>оновлення бази</span>
              </div>
            </div>
          </div>

          <aside className="hero-aside">
            <div className="hero-aside__card">
              <p className="eyebrow">Чому MerchUA</p>
              <ul>
                <li>Тільки перевірені вакансії для мерчендайзерів</li>
                <li>Новини зʼявляються одразу, без затримок</li>
                <li>Просто дивись, обирай і телефонуй роботодавцю</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Вакансії</p>
            <h2>Актуальні пропозиції для мерчендайзерів</h2>
            <p>
              Список оновлюється щодня — тут лише активні вакансії, без застарілих оголошень.
            </p>
          </div>

          <CategoryFilters activeCategory={category} categories={categories} q={q} />

          {vacancies.items.length > 0 ? (
            <VacancyGrid items={vacancies.items} />
          ) : (
            <div className="empty-state">
              <h3>Наразі нічого не знайдено</h3>
              <p>Спробуйте змінити пошук або обрати іншу категорію.</p>
            </div>
          )}

          <Pagination category={category} page={vacancies.page} q={q} totalPages={vacancies.totalPages} />
        </div>
      </section>
    </>
  );
}
