/*
  Warnings:

  - Added the required column `reasons` to the `Scan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riskLevel` to the `Scan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riskScore` to the `Scan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scan" ADD COLUMN     "reasons" JSONB NOT NULL,
ADD COLUMN     "riskLevel" TEXT NOT NULL,
ADD COLUMN     "riskScore" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
