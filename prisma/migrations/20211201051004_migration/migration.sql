/*
  Warnings:

  - You are about to drop the column `streat_name` on the `Address` table. All the data in the column will be lost.
  - Added the required column `street_name` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "streat_name",
ADD COLUMN     "street_name" TEXT NOT NULL;
