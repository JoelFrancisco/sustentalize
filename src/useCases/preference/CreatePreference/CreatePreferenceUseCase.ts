export class CreatePreferenceUseCase {
  constructor (
    private mercadopago: any
  ){}

  async execute(preference: any) {
    try { 
      const res = await this.mercadopago.preferences.create(preference);
      return { 
        error: false, 
        message: 'preference created successfully', 
        id: res.response.id 
      };  
    } catch (err) {
      return { 
        error: true, 
        message: 'preference creating failed' 
      }; 
    }
  }
}