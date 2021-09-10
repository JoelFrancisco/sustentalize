/*
  Warnings:

  - Made the column `user_id` on table `Addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Addresses" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activated" DROP NOT NULL;
