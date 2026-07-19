const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    return FALLBACK_SITE_URL;
  }

  return raw.replace(/\/+$/, "");
}

export function getIngestApiKey(): string {
  return process.env.INGEST_API_KEY?.trim() ?? "";
}
