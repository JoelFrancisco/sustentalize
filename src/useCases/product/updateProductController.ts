import { Request, Response } from "express";
import { PrismaClient, Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/ProductRepository/Implementation/PostgressProductRepository";

export class UpdateProduct {
  public static async update(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const productRepository = new ProductRepository(prisma);

    try {
      const product: Product = { ...req.body };

      await productRepository.updateProduct(product);
    } catch(err: any) {
      return res
        .status(404)
        .json({ message: "Error Updating Product"});
    } finally {
      await prisma.$disconnect();
    }

    return res
      .status(200)
      .json({ message: "User updated successfully" });
  }
}