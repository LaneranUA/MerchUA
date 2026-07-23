import Link from "next/link";

function buildHref(page: number, q?: string, category?: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

type PaginationProps = {
  page: number;
  totalPages: number;
  q?: string;
  category?: string;
};

export function Pagination({ page, totalPages, q, category }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const items: (number | "ellipsis")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push("ellipsis");
    items.push(p);
  });

  return (
    <nav aria-label="Пагінація" className="mt-16 flex flex-col md:flex-row justify-center items-center gap-stack-md">
      <div className="flex items-center gap-2">
        {items.map((item, i) =>
          item === "ellipsis" ? (
            <span className="px-2 text-outline" key={`e-${i}`}>
              …
            </span>
          ) : (
            <Link
              aria-current={item === page ? "page" : undefined}
              className={
                item === page
                  ? "w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary font-label-md text-label-md transition-colors"
                  : "w-10 h-10 flex items-center justify-center rounded-full bg-white border border-surface-border text-text-secondary hover:border-primary hover:text-primary font-label-md text-label-md transition-all"
              }
              href={buildHref(item, q, category)}
              key={item}
            >
              {item}
            </Link>
          )
        )}
      </div>
      {page < totalPages ? (
        <Link
          className="flex items-center gap-2 text-primary font-label-md text-label-md hover:underline"
          href={buildHref(page + 1, q, category)}
        >
          Наступна
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      ) : null}
    </nav>
  );
}
