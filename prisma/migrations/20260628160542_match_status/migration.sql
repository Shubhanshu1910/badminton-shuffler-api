/*
  Warnings:

  - You are about to drop the column `result` on the `Match` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'PLAYING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "result",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "status" "MatchStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "teamAScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "teamBScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "winner" INTEGER;

-- AlterTable
ALTER TABLE "MatchPlayer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");
