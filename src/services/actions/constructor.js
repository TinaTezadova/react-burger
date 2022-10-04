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

export const getIngredientsRequest = () => {
  return {
    type: GET_INGREDIENTS_REQUEST
  }
}

export const getIngredientsSuccess = (payload) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload
  }
}

export const getIngredientsFailed = () => {
  return {
    type: GET_INGREDIENTS_FAILED,
  }
}


export const getOrderRequest = () => {
  return {
    type: GET_ORDER_REQUEST
  }
}

export const getOrderSuccess = (payload) => {
  return {
    type: GET_ORDER_SUCCESS,
    payload
  }
}

export const getOrderFailed = () => {
  return {
    type: GET_ORDER_FAILED,
  }
}

export const sortConstructorItems = (payload) => {
  return {
    type: SORT_CONSTRUCTOR_ITEMS,
    payload
  }
}

export const getIngredientsForConstructor = () => {
  return {
    type: GET_INGREDIENTS_FOR_CONSTRUCTOR,
  }
}

export const setIngredientsForConstructor = (payload) => {
  return {
    type: SET_INGREDIENTS_FOR_CONSTRUCTOR,
    payload,
    uuid: uuidv4()
  }
}

export const changeBun = (payload) => {
  return {
    type: CHANGE_BUN,
    payload
  }
}

export const removeIngredientsForConstructor = (payload) => {
  return {
    type: REMOVE_INGREDIENTS_FOR_CONSTRUCTOR,
    payload
  }
}

export const setIngredientDetail = (payload) => {
  return {
    type: SET_INGREDIENT_DETAIL,
    payload
  }
}

export const resetIngredientDetail = () => {
  return {
    type: RESET_INGREDIENT_DETAIL,
  }
}

export const addIngredientCount = (payload) => {
  return {
    type: ADD_INGREDIENT_COUNT,
    payload
  }
}

export const removeIngredientCount = (payload) => {
  return {
    type: REMOVE_INGREDIENT_COUNT,
    payload
  }
}

export const addOrderPrice = (payload) => {
  return {
    type: ADD_ORDER_PRICE,
    payload
  }
}

export const removeOrderPrice = (payload) => {
  return {
    type: REMOVE_ORDER_PRICE,
    payload
  }
}

export const getIngredientsData = () => async (dispatch) => {
  try {
    dispatch(getIngredientsRequest());
    const res = await getIngredients();
    dispatch(getIngredientsSuccess(res.data));

  } catch (e) {
    dispatch(getIngredientsFailed());
    console.log(e)
  } 
};

export const getOrderDetail = (ingredientsId) => async (dispatch) => {
  try {
    dispatch(getOrderRequest());
    const res = await getOrder(ingredientsId, getCookie('accessToken'));
    dispatch(getOrderSuccess(res));

  } catch (e) {
    dispatch(getOrderFailed());
    console.log(e)
  } 
};

  export const sortConstructorIngredients = (constructorIngredients, currentIndex, atIndex, el) => {
    return (dispatch) => {
      const data = update(constructorIngredients, {
        $splice: [
          [currentIndex, 1],
          [atIndex, 0, el],
        ],
      })

      dispatch(sortConstructorItems(data))

    }
  }