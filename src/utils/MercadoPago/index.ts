import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: ''
});

const preference = { 
  items: [
    {
      title: 'Blusa azul',
      quantity: 1,
      currency_id: '',
      unit_price: 20.5
    }
  ]
};

mercadopago.preferences.create(preference);
