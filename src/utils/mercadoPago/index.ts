import mercadopago from 'mercadopago';
import { Product } from '@prisma/client';
import axios from 'axios';

const start = () => {
  mercadopago.configure({
    access_token: '' 
  });

  (async () => {
    const res = await axios.get('http://localhost:3000/products');

    const products = res.data.products;

    const items = products.map((product: Product)=> {
      const { name, price } = product;
      return { 
        title: name, 
        quantity: 1, 
        currency_id: 'BRL', 
        unit_price: price 
      };
    });

    const preference = { 
      items
    };

    mercadopago.preferences.create(preference);
  })()
}

export { start };
