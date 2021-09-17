import { Request, Response } from "express";
import { PrismaClient, Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/implementation/PostgressProductRepository";

export class CreateProduct {
  public static async create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const productRepository = new ProductRepository(prisma);

    try {
      const product: Product = { ...req.body };

      const answer = await productRepository.store(product);

      if (!answer)
        return res
          .status(404)
          .json({ message: "Product already exist" });

    } catch(err: any) {
      return res
        .status(404)
        .json({ message: "Error Creating Product"});
    } finally {
      await prisma.$disconnect();
    }

    return res
      .status(201)
      .json({ message: "Product created successfully" });
  }
}