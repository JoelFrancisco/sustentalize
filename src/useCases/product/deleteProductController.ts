import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../../repositories/ProductRepository/Implementation/PostgressProductRepository"; 

export class DeleteProduct {
  public static async delete(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const productRepository = new ProductRepository(prisma);

    try {
      const id = req.body.id;

      await productRepository.delete(id);
    } catch(err: any) {
      return res
        .status(404)
        .json({ message: "Error Creating Product"});
    } finally {
      await prisma.$disconnect();
    }

    return res
      .json({ message: "Product deleted successfully" });
  }
}