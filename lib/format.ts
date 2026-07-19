import { getSiteUrl } from "@/lib/env";

export function buildVacancyPath(slug: string): string {
  return `/vacancies/${slug}`;
}

export function buildVacancyUrl(slug: string): string {
  return `${getSiteUrl()}${buildVacancyPath(slug)}`;
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export function formatSalaryRange(
  salaryMin?: number | null,
  salaryMax?: number | null,
  currency?: string | null
): string | null {
  const resolvedCurrency = currency ?? "UAH";

  if (!salaryMin && !salaryMax) {
    return null;
  }

  const formatter = new Intl.NumberFormat("uk-UA");

  if (salaryMin && salaryMax) {
    return `${formatter.format(salaryMin)} – ${formatter.format(salaryMax)} ${resolvedCurrency}`;
  }

  if (salaryMin) {
    return `від ${formatter.format(salaryMin)} ${resolvedCurrency}`;
  }

  return `до ${formatter.format(salaryMax as number)} ${resolvedCurrency}`;
}

export function formatEmploymentType(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();
  const labels: Record<string, string> = {
    "full-time": "Повна зайнятість",
    "part-time": "Часткова зайнятість",
    temp: "Тимчасова робота",
    contract: "Контракт",
    freelance: "Фріланс",
    remote: "Віддалено",
    hybrid: "Гібридний формат"
  };

  return labels[normalized] ?? value;
}

export function formatDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  const datePart = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
  const timePart = new Intl.DateTimeFormat("uk-UA", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);

  return `${datePart}, ${timePart}`;
}

export function formatRelativeTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  const diffMs = date.getTime() - Date.now();
  const diffHours = Math.round(diffMs / 3_600_000);
  const diffDays = Math.round(diffMs / 86_400_000);

  if (Math.abs(diffHours) < 1) {
    return "щойно";
  }

  if (Math.abs(diffHours) < 24) {
    return diffHours < 0 ? `${Math.abs(diffHours)} год тому` : `через ${diffHours} год`;
  }

  if (Math.abs(diffDays) < 7) {
    return diffDays < 0 ? `${Math.abs(diffDays)} дн тому` : `через ${diffDays} дн`;
  }

  return formatDate(date);
}
