-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'Львів',
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "salaryCurrency" TEXT DEFAULT 'UAH',
    "employmentType" TEXT,
    "category" TEXT,
    "sourceChannel" TEXT,
    "tgMessageId" TEXT NOT NULL,
    "blueskyUri" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Vacancy_slug_key" ON "Vacancy"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vacancy_tgMessageId_key" ON "Vacancy"("tgMessageId");

-- CreateIndex
CREATE INDEX "Vacancy_isActive_publishedAt_idx" ON "Vacancy"("isActive", "publishedAt");

-- CreateIndex
CREATE INDEX "Vacancy_category_idx" ON "Vacancy"("category");
