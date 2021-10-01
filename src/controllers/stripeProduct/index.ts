import { Request, Response } from "express";
import { stripe } from '../../utils/payments/stripe';

export async function stripeProduct(req: Request, res: Response) {
  try {
    const products = await stripe.products.list();

    return res
      .status(201)
      .json({ products: products.data });
    
  } catch(err: any) {
    return res
      .status(404)
      .json({ message: "Error getting Product"});
  }
}