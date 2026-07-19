function slugifyPart(value: string): string {
  const normalized = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return normalized || "vacancy";
}

export function createVacancySlug(title: string, id: string): string {
  const suffix = id.slice(-6).toLowerCase();
  return `${slugifyPart(title).slice(0, 72)}-${suffix}`;
}
