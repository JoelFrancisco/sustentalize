/*
  Warnings:

  - Added the required column `cart_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cart_id" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cart_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
