import { getIngredients, getOrder } from '../../utils/burger-api';
import update from 'immutability-helper'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';


export const GET_INGREDIENTS_FOR_CONSTRUCTOR = 'GET_INGREDIENTS_FOR_CONSTRUCTOR';
export const SET_INGREDIENTS_FOR_CONSTRUCTOR = 'SET_INGREDIENTS_FOR_CONSTRUCTOR';
export const REMOVE_INGREDIENTS_FOR_CONSTRUCTOR = 'REMOVE_INGREDIENTS_FOR_CONSTRUCTOR';


export const SET_INGREDIENT_DETAIL = 'GET_INGREDIENT_DETAIL';
export const RESET_INGREDIENT_DETAIL = 'RESET_INGREDIENT_DETAIL';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const ADD_INGREDIENT_COUNT = 'ADD_INGREDIENT_COUNT';
export const REMOVE_INGREDIENT_COUNT = 'REMOVE_INGREDIENT_COUNT';

export const CHANGE_BUN = 'CHANGE_BUN';
export const ADD_ORDER_PRICE = 'ADD_ORDER_PRICE';
export const REMOVE_ORDER_PRICE = 'REMOVE_ORDER_PRICE';

export const SORT_CONSTRUCTOR_ITEMS = 'SORT_CONSTRUCTOR_ITEMS';





export function getIngredientsData() {
    return function(dispatch: (arg0: { type: string; payload?: any; }) => void) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      getIngredients().then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      });
    };
  }



  export function getOrderDetail(ingredientsId: string[]) {
    return function(dispatch: (arg0: { type: string; payload?: any; }) => void) {
      dispatch({
        type: GET_ORDER_REQUEST
      });
      getOrder(ingredientsId).then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED
          });
        }
      });
    };
  }

  export const sortConstructorIngredients = (constructorIngredients: any, currentIndex: number, atIndex: number, el: any) => {
    return (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
      const data = update(constructorIngredients, {
        $splice: [
          [currentIndex, 1],
          [atIndex, 0, el],
        ],
      })

      dispatch({
        type: SORT_CONSTRUCTOR_ITEMS,
        payload: data
      })

    }
  }