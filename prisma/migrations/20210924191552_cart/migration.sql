/*
  Warnings:

  - You are about to drop the column `cart_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `cart_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cart_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cart_id",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cart_id";

-- DropTable
DROP TABLE "Cart";

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
