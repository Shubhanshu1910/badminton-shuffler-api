-- CreateTable
CREATE TABLE "SessionCourt" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "courtId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionCourt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SessionCourt_sessionId_idx" ON "SessionCourt"("sessionId");

-- CreateIndex
CREATE INDEX "SessionCourt_courtId_idx" ON "SessionCourt"("courtId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionCourt_sessionId_courtId_key" ON "SessionCourt"("sessionId", "courtId");

-- AddForeignKey
ALTER TABLE "SessionCourt" ADD CONSTRAINT "SessionCourt_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionCourt" ADD CONSTRAINT "SessionCourt_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE CASCADE ON UPDATE CASCADE;
