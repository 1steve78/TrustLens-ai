-- CreateTable
CREATE TABLE "ScamBrief" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "howItWorks" TEXT NOT NULL,
    "staySafe" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "scamType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScamBrief_pkey" PRIMARY KEY ("id")
);
