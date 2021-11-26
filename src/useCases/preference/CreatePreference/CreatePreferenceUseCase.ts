export class CreatePreferenceUseCase {
  constructor (
    private mercadopago: any
  ){}

  async execute(preference: any) {
    const { id } = this.mercadopago.preferences.create(preference);
    return id;
  }
}