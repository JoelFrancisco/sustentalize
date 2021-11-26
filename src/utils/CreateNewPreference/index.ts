type Product = {
  title: string,
  description: string,
  picture_url: string,
  category_id: string,
  quantity: number,
  currency_id: string,
  unit_price: number,
}

const createNewPreference = async (mercadoPago: any, product: Product) => {
  try {
    const res = await mercadoPago.preferences.create({ items: [product] });
  } catch(err) {

  }
}