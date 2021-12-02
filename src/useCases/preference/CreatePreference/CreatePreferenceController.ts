import { Request, Response } from 'express';
import { ProductRepository } from '../../../repositories/ProductRepository/Implementation/PostgressProductRepository';
import { CreatePreferenceUseCase } from './CreatePreferenceUseCase';

export class CreatePreferenceController {
  constructor(
    private createPreferenceUseCase: CreatePreferenceUseCase,
    private productRepository: ProductRepository,
    private getImageUrl: any 
  ) {}

  async handle(req: any, res: Response) {
    const productsIds = Number.isInteger(req.body.products) ? [ req.body.products ] : [ ...req.body.products ];
    const selectedAddress = { ...req.body.selectedAddress };
    
    const products = await Promise.all(productsIds.map(async (productId: number) => {
      try { 
        const product = await this.productRepository.findById(productId);
        return product;
      } catch (err: any) {
        console.error(err);
      }
    }));
    
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
        }
      }
    }

    const { error, message, ...rest } = await this.createPreferenceUseCase.execute(preference);
    
    return error
      ? res.status(400).json({ message })
      : res.status(201).json({ message, preferenceId: rest.id });
  }
}