import Link from "next/link";

type CategoryFiltersProps = {
  categories: string[];
  activeCategory?: string;
  q?: string;
};

function buildHref(q: string | undefined, category: string | undefined) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

export function CategoryFilters({ categories, activeCategory, q }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-stack-sm mb-stack-lg">
      <Link
        className={
          !activeCategory
            ? "bg-primary text-on-primary font-label-md text-label-md px-stack-lg py-2 rounded-full transition-all"
            : "bg-surface-container-highest text-text-secondary hover:bg-surface-border font-label-md text-label-md px-stack-lg py-2 rounded-full transition-all"
        }
        href={buildHref(q, undefined)}
      >
        Всі вакансії
      </Link>
      {categories.map((category) => (
        <Link
          className={
            activeCategory === category
              ? "bg-primary text-on-primary font-label-md text-label-md px-stack-lg py-2 rounded-full transition-all"
              : "bg-surface-container-highest text-text-secondary hover:bg-surface-border font-label-md text-label-md px-stack-lg py-2 rounded-full transition-all"
          }
          href={buildHref(q, category)}
          key={category}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
