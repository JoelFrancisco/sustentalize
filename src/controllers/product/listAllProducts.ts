import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../../repositories/implementation/PostgressProductRepository";

export class ListAllProducts {
  public static async create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const productRepository = new ProductRepository(prisma);

    try {
      const products = await productRepository.listAll();

      return res
        .status(200)
        .json({ products });
    } catch(err: any) {
      return res
        .status(404)
        .json({ message: "Error Creating Product"});
    } finally {
      await prisma.$disconnect();
    }
  }
}