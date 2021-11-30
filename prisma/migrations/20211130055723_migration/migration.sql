/*
  Warnings:

  - You are about to drop the column `productId` on the `Sale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_productId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "saleId" INTEGER;

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "productId",
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
