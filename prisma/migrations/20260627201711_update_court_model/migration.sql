/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Court` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Court" DROP CONSTRAINT "Court_sessionId_fkey";

-- AlterTable
ALTER TABLE "Court" DROP COLUMN "sessionId";
