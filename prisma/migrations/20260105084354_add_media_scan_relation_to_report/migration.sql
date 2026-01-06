/*
  Warnings:

  - Made the column `userId` on table `LearningActivity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "LearningActivity" DROP CONSTRAINT "LearningActivity_userId_fkey";

-- AlterTable
ALTER TABLE "LearningActivity" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "mediaScanId" TEXT;

-- CreateTable
CREATE TABLE "MediaScan" (
    "id" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "thumbnail" TEXT,
    "verdict" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "summary" TEXT NOT NULL,
    "signals" TEXT[],
    "frameCount" INTEGER,
    "modelUsed" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "MediaScan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LearningActivity" ADD CONSTRAINT "LearningActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_mediaScanId_fkey" FOREIGN KEY ("mediaScanId") REFERENCES "MediaScan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaScan" ADD CONSTRAINT "MediaScan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
