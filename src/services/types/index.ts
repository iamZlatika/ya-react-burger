export interface IIngredient {
    _id: number
    type?: string
    name: string
    price: number
    image: any,
    calories?: number,
    proteins?: number,
    fat?: number,
    carbohydrates?: number
  }