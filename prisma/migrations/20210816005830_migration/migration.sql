/*
  Warnings:

  - Added the required column `addresss` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addresses" ADD COLUMN     "addresss" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
