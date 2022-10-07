import { IIngredientItem, IBunData, IConstructorIngredients } from '../../../types/type';

export interface IConstructorOrder {
    number: number,
    success: boolean,
    name: string
}

export type TConstructorState = {
    ingredientsData: IIngredientItem[],
    constructorIngredients: IConstructorIngredients[],
    currentIngredient: IIngredientItem | {},
    order: IConstructorOrder,
    ingredientsRequest: boolean,
    ingredientsRequestFailed: boolean,
    orderRequest: boolean,
    orderRequestFailed: boolean,
    orderPrice: number,
    bun: IBunData
}