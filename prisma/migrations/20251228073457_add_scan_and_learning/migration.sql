/*
  Warnings:

  - You are about to drop the column `reasons` on the `Scan` table. All the data in the column will be lost.
  - You are about to drop the column `riskScore` on the `Scan` table. All the data in the column will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Scan" DROP COLUMN "reasons",
DROP COLUMN "riskScore",
ADD COLUMN     "details" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "summary" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "riskLevel" SET DEFAULT 'Suspicious';

-- DropTable
DROP TABLE "Report";

-- CreateTable
CREATE TABLE "LearningActivity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "LearningActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LearningActivity_createdAt_idx" ON "LearningActivity"("createdAt");

-- CreateIndex
CREATE INDEX "Scan_createdAt_idx" ON "Scan"("createdAt");

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningActivity" ADD CONSTRAINT "LearningActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
