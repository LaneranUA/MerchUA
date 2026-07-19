import { z } from "zod";

function emptyToUndefined(value: unknown) {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return value;
}

const optionalString = z.preprocess(
  emptyToUndefined,
  z.string().min(1).max(500).optional()
);

const requiredString = z.preprocess(
  emptyToUndefined,
  z.string().min(1).max(10_000)
);

const optionalInt = z.preprocess((value) => {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  if (typeof value === "number") {
    return Math.trunc(value);
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : value;
  }

  return value;
}, z.number().int().nonnegative().optional());

const optionalDate = z.preprocess((value) => {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed;
  }

  return value;
}, z.date().optional());

export const vacancyCreateSchema = z.object({
  title: requiredString,
  description: requiredString,
  company: optionalString,
  location: optionalString.default("Львів"),
  salaryMin: optionalInt,
  salaryMax: optionalInt,
  salaryCurrency: optionalString.default("UAH"),
  employmentType: optionalString,
  category: optionalString,
  sourceChannel: optionalString,
  tgMessageId: requiredString,
  tgMessageUrl: optionalString,
  expiresAt: optionalDate
});

export const vacancyPatchSchema = z.object({
  blueskyUri: requiredString
});

export type VacancyCreateInput = z.infer<typeof vacancyCreateSchema>;
export type VacancyPatchInput = z.infer<typeof vacancyPatchSchema>;
