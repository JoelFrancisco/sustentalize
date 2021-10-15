import { Product as IProduct } from "@prisma/client";

export class Product implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public size: string,
    public color: string,
    public description: string,
    public userId: number,
  ){}
}