/*
  Warnings:

  - You are about to drop the column `likesCount` on the `LearningActivity` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `likesCount` on the `Scan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LearningActivity" DROP COLUMN "likesCount";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "likesCount";

-- AlterTable
ALTER TABLE "Scan" DROP COLUMN "likesCount";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scanId" TEXT,
    "learningId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_scanId_key" ON "Like"("userId", "scanId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_learningId_key" ON "Like"("userId", "learningId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_learningId_fkey" FOREIGN KEY ("learningId") REFERENCES "LearningActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
