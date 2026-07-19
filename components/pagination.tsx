import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  category?: string;
  q?: string;
};

function buildHref(page: number, category?: string, q?: string) {
  const params = new URLSearchParams();
  params.set("page", String(page));

  if (category) {
    params.set("category", category);
  }

  if (q) {
    params.set("q", q);
  }

  return `/?${params.toString()}`;
}

export function Pagination({ page, totalPages, category, q }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Пагінація" className="pagination">
      <Link
        aria-disabled={page <= 1}
        className={`pagination-link ${page <= 1 ? "is-disabled" : ""}`}
        href={page <= 1 ? buildHref(1, category, q) : buildHref(page - 1, category, q)}
      >
        Назад
      </Link>

      <div className="pagination-pages">
        {pages.map((value) => (
          <Link
            key={value}
            className={`pagination-link ${value === page ? "is-active" : ""}`}
            href={buildHref(value, category, q)}
          >
            {value}
          </Link>
        ))}
      </div>

      <Link
        aria-disabled={page >= totalPages}
        className={`pagination-link ${page >= totalPages ? "is-disabled" : ""}`}
        href={
          page >= totalPages ? buildHref(totalPages, category, q) : buildHref(page + 1, category, q)
        }
      >
        Далі
      </Link>
    </nav>
  );
}
