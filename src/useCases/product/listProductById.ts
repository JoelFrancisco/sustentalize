import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../../repositories/ProductRepository/Implementation/PostgressProductRepository";

export class ListProduct {
  public static async list(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const productRepository = new ProductRepository(prisma);

    try {
      const id = req.params.id;

      const product = await productRepository.findById(Number.parseInt(id));

      return res
        .status(201)
        .json({ product });
    } catch(err: any) {
      return res
        .status(404)
        .json({ message: "Error Finding Product"});
    } finally {
      await prisma.$disconnect();
    }
  }
}