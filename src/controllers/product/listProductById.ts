import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../../repositories/implementation/PostgressProductRepository";

export class ListProduct {
  public static async create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const productRepository = new ProductRepository(prisma);

    try {
      const id = req.body.id;

      const product = await productRepository.findById(id);

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