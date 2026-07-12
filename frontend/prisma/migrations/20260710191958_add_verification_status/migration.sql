-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "targetWeight" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Dietitian" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
