/*
  Warnings:

  - A unique constraint covering the columns `[session_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "session_id" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User.session_id_unique" ON "User"("session_id");
