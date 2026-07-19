import Link from "next/link";

type CategoryFiltersProps = {
  categories: string[];
  activeCategory?: string;
  q?: string;
};

function buildHref(category?: string, q?: string) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (q) {
    params.set("q", q);
  }

  const query = params.toString();
  return query ? `/?${query}` : "/";
}

export function CategoryFilters({ categories, activeCategory, q }: CategoryFiltersProps) {
  return (
    <div className="chip-row" aria-label="Фільтри категорій">
      <Link
        className={`chip ${!activeCategory ? "chip-active" : ""}`}
        href={buildHref(undefined, q)}
      >
        Всі вакансії
      </Link>

      {categories.length > 1
        ? categories.map((category) => (
            <Link
              key={category}
              className={`chip ${activeCategory === category ? "chip-active" : ""}`}
              href={buildHref(category, q)}
            >
              {category}
            </Link>
          ))
        : null}
    </div>
  );
}
