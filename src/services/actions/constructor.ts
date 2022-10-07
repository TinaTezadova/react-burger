import { getIngredients, getOrder } from '../../utils/burger-api';
import update from 'immutability-helper';
import { getCookie } from '../../utils/cookie';

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
} from './consts';
import { v4 as uuidv4 } from 'uuid';
import {
  IAddIngredientCountAction,
  IAddOrderPriceAction,
  IChangeBunAction,
  IGetIngredientsFailedAction,
  IGetIngredientsForConstructorAction,
  IGetIngredientsRequestAction,
  IGetIngredientsSuccessAction,
  IGetOrderFailedAction,
  IGetOrderRequestAction,
  IGetOrderSuccessAction,
  IRemoveIngredientCountAction,
  IRemoveIngredientsForConstructorAction,
  IRemoveOrderPriceAction,
  IResetIngredientDetailAction,
  ISetIngredientDetailAction,
  ISetIngredientsForConstructorAction,
  ISortConstructorItemsAction
} from './types/constructor';
import { AppThunk, AppDispatch, IIngredientItem, IOrderDetailResult, IConstructorIngredients } from '../../types/type';

export const getIngredientsRequest = (): IGetIngredientsRequestAction => {
  return {
    type: GET_INGREDIENTS_REQUEST
  }
}

export const getIngredientsSuccess = (payload: IIngredientItem[]): IGetIngredientsSuccessAction => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload
  }
}

export const getIngredientsFailed = (): IGetIngredientsFailedAction => {
  return {
    type: GET_INGREDIENTS_FAILED,
  }
}


export const getOrderRequest = (): IGetOrderRequestAction => {
  return {
    type: GET_ORDER_REQUEST
  }
}

export const getOrderSuccess = (payload: IOrderDetailResult): IGetOrderSuccessAction => {
  return {
    type: GET_ORDER_SUCCESS,
    payload
  }
}

export const getOrderFailed = (): IGetOrderFailedAction => {
  return {
    type: GET_ORDER_FAILED,
  }
}

export const sortConstructorItems = (payload: IConstructorIngredients[]): ISortConstructorItemsAction => {
  return {
    type: SORT_CONSTRUCTOR_ITEMS,
    payload
  }
}

export const getIngredientsForConstructor = (): IGetIngredientsForConstructorAction => {
  return {
    type: GET_INGREDIENTS_FOR_CONSTRUCTOR,
  }
}

export const setIngredientsForConstructor = (payload: string): ISetIngredientsForConstructorAction => {
  return {
    type: SET_INGREDIENTS_FOR_CONSTRUCTOR,
    payload,
    uuid: uuidv4()
  }
}

export const changeBun = (payload: string): IChangeBunAction => {
  return {
    type: CHANGE_BUN,
    payload
  }
}

export const removeIngredientsForConstructor = (payload: string): IRemoveIngredientsForConstructorAction => {
  return {
    type: REMOVE_INGREDIENTS_FOR_CONSTRUCTOR,
    payload
  }
}

export const setIngredientDetail = (payload: IIngredientItem): ISetIngredientDetailAction => {
  return {
    type: SET_INGREDIENT_DETAIL,
    payload
  }
}

export const resetIngredientDetail = (): IResetIngredientDetailAction => {
  return {
    type: RESET_INGREDIENT_DETAIL,
  }
}

export const addIngredientCount = (payload: string): IAddIngredientCountAction => {
  return {
    type: ADD_INGREDIENT_COUNT,
    payload
  }
}

export const removeIngredientCount = (payload: string): IRemoveIngredientCountAction => {
  return {
    type: REMOVE_INGREDIENT_COUNT,
    payload
  }
}

export const addOrderPrice = (payload: number): IAddOrderPriceAction => {
  return {
    type: ADD_ORDER_PRICE,
    payload
  }
}

export const removeOrderPrice = (payload: number): IRemoveOrderPriceAction => {
  return {
    type: REMOVE_ORDER_PRICE,
    payload
  }
}

export const getIngredientsData: AppThunk = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getIngredientsRequest());
    const res = await getIngredients();
    
    dispatch(getIngredientsSuccess(res.data));

  } catch (e) {
    dispatch(getIngredientsFailed());
    console.log(e)
  }
};

export const getOrderDetail: AppThunk = (ingredientsId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getOrderRequest());
    const res = await getOrder(ingredientsId, getCookie('accessToken'));
    dispatch(getOrderSuccess(res));

  } catch (e) {
    dispatch(getOrderFailed());
    console.log(e)
  }
};

export const sortConstructorIngredients: AppThunk = (constructorIngredients: IConstructorIngredients[], currentIndex: number, atIndex: number, el: IConstructorIngredients) => {
  return (dispatch: AppDispatch) => {
    const data = update(constructorIngredients, {
      $splice: [
        [currentIndex, 1],
        [atIndex, 0, el],
      ],
    })

    dispatch(sortConstructorItems(data))

  }
}