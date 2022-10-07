import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_FOR_CONSTRUCTOR,
    SET_INGREDIENT_DETAIL,
    RESET_INGREDIENT_DETAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    SET_INGREDIENTS_FOR_CONSTRUCTOR,
    ADD_INGREDIENT_COUNT,
    REMOVE_INGREDIENT_COUNT,
    REMOVE_INGREDIENTS_FOR_CONSTRUCTOR,
    CHANGE_BUN,
    ADD_ORDER_PRICE,
    REMOVE_ORDER_PRICE,
    SORT_CONSTRUCTOR_ITEMS
} from '../consts';
import { IIngredientItem, IOrderDetailResult, IConstructorIngredients } from '../../../types/type';

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: IIngredientItem[];
};

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
};

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
};

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload: IOrderDetailResult;
};

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
};

export interface ISortConstructorItemsAction {
    readonly type: typeof SORT_CONSTRUCTOR_ITEMS;
    readonly payload: IConstructorIngredients[];
};

export interface IGetIngredientsForConstructorAction {
    readonly type: typeof GET_INGREDIENTS_FOR_CONSTRUCTOR;
};

export interface ISetIngredientsForConstructorAction {
    readonly type: typeof SET_INGREDIENTS_FOR_CONSTRUCTOR;
    readonly payload: string;
    readonly uuid: string;
};

export interface IChangeBunAction {
    readonly type: typeof CHANGE_BUN;
    readonly payload: string;
};

export interface IRemoveIngredientsForConstructorAction {
    readonly type: typeof REMOVE_INGREDIENTS_FOR_CONSTRUCTOR;
    readonly payload: string;
};

export interface ISetIngredientDetailAction {
    readonly type: typeof SET_INGREDIENT_DETAIL;
    readonly payload: IIngredientItem;
};

export interface IResetIngredientDetailAction {
    readonly type: typeof RESET_INGREDIENT_DETAIL;
};

export interface IAddIngredientCountAction {
    readonly type: typeof ADD_INGREDIENT_COUNT;
    readonly payload: string;
};

export interface IRemoveIngredientCountAction {
    readonly type: typeof REMOVE_INGREDIENT_COUNT;
    readonly payload: string;
};

export interface IAddOrderPriceAction {
    readonly type: typeof ADD_ORDER_PRICE;
    readonly payload: number;
};

export interface IRemoveOrderPriceAction {
    readonly type: typeof REMOVE_ORDER_PRICE;
    readonly payload: number;
};

export type TConstructorActions = IGetIngredientsRequestAction | IGetIngredientsSuccessAction | IGetIngredientsFailedAction | IGetOrderRequestAction | IGetOrderSuccessAction
| IGetOrderFailedAction | ISortConstructorItemsAction | IGetIngredientsForConstructorAction | ISetIngredientsForConstructorAction | IChangeBunAction | IRemoveIngredientsForConstructorAction
| ISetIngredientDetailAction | IResetIngredientDetailAction | IAddIngredientCountAction | IRemoveIngredientCountAction | IAddOrderPriceAction | IRemoveOrderPriceAction;