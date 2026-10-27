-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "status" "RecordStatus" NOT NULL DEFAULT 'DRAFT';
