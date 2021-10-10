/*
  Warnings:

  - You are about to drop the column `activated` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `activation_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Addresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_user_id_fkey";

-- DropIndex
DROP INDEX "User.activation_id_unique";

-- DropIndex
DROP INDEX "User.session_id_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activated",
DROP COLUMN "activation_id",
DROP COLUMN "session_id";

-- DropTable
DROP TABLE "Addresses";
