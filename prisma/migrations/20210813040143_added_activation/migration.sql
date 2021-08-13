/*
  Warnings:

  - A unique constraint covering the columns `[activation_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activation_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "activation_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.activation_id_unique" ON "User"("activation_id");
