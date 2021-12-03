import { Request, Response } from 'express';
import { ProductRepository } from '../../../repositories/ProductRepository/Implementation/PostgressProductRepository';
import { CreatePreferenceUseCase } from './CreatePreferenceUseCase';

export class CreatePreferenceController {
  constructor(
    private createPreferenceUseCase: CreatePreferenceUseCase,
    private productRepository: ProductRepository,
    private getImageUrl: any
  ) { }

  async handle(req: any, res: Response) {
    const receivedProducts = req.body.products;
    const productsIds = receivedProducts.map((product: any) => {
      return product.id;
    });

    const selectedAddress = { ...req.body.selectedAddress };

    const products = await Promise.all(productsIds.map(async (productId: number) => {
      try {
        const product = await this.productRepository.findById(Number(productId));
        console.log(product);
        return product;
      } catch (err: any) {
        console.error(err);
      }
    }));

    
    for (let i = 0; i < receivedProducts.length; i++) {
      products[i].quantity = products[i].quantity - receivedProducts[i].quantity;
      if (products[i].quantity <= 0) {
        try {
          await this.productRepository.delete(products[i].id);
        } catch (err: any) {
          console.error(err);
        }
      }
    }
    
    for (const product of products) {
      try {
        await this.productRepository.updateProduct(product);
      } catch (err: any) {
        console.error(err);
      }
    }

    for (let i = 0; i < receivedProducts.length; i++) {
      products[i].quantity = receivedProducts[i].quantity;
    }

    const productsWithImages = products.map((product: any) => {
      const url = this.getImageUrl(product.image_url);
      return { ...product, image_url: url };
    });

    const items = productsWithImages.map(product => {
      return {
        title: product.name,
        description: product.description,
        quantity: product.quantity,
        picture_url: product.image_url,
        unit_price: product.price,
        currency_id: 'BRL',
      };
    });
    
    const preference = {
      items,
      shipments: {
        receiver_address: {
          zip_code: selectedAddress.zip_code,
          street_name: selectedAddress.street_name,
          street_number: selectedAddress.house_number,
        },
      }
    }

    const { error, message, ...rest } = await this.createPreferenceUseCase.execute(preference);

    return error
      ? res.status(400).json({ message })
      : res.status(201).json({ message, preferenceId: rest.id });
  }
}