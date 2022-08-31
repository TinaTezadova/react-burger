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
} from '../actions/consts';

const initialState = {
    ingredientsData: [],
    constructorIngredients: [],
    currentIngredient: {},
    order: {
      number: 0,
      success: false,
      name: ''
    },
    ingredientsRequest: false,
    ingredientsRequestFailed: false,
    orderRequest: false,
    orderRequestFailed: false,
    orderPrice: 0,
    bun: {
      name: '',
      price: 0,
      image: '',
      _id: ''
    }
  };


export const constructorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
      /* const buns = action.payload.filter((item: any) => item.type === "bun"); */
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsRequestFailed: false,
        bun: {},
        orderPrice: 0,
        ingredientsData: action.payload.map((item: any) => {
          return {...item, count: 0}
        }),
      };
    }

    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsRequestFailed: true,
      };
    }

    case GET_INGREDIENTS_FOR_CONSTRUCTOR: {
      
      return {
        ...state,
        constructorIngredients: [] /* state.ingredientsData.filter((item: {type: string;}) => item.type !== 'bun') */,
      };
    }

    case SET_INGREDIENT_DETAIL: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }

    case RESET_INGREDIENT_DETAIL: {
      return {
        ...state,
        currentIngredient: initialState.currentIngredient,
      };
    }

    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }

    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderRequestFailed: false,
        order: {
          name: action.payload.name,
          success: action.payload.success,
          number: action.payload.order.number
        },
        orderPrice: 0,
        constructorIngredients: [],
        bun: [],
        ingredientsData: state.ingredientsData.map((item: any) => {
          return {
            ...item,
            count: 0
          }
        }),
      };
    }

    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderRequestFailed: true,
      };
    }

    case SET_INGREDIENTS_FOR_CONSTRUCTOR: {
      const currentItem = state.ingredientsData.filter((item: any) => item._id === action.payload).map((item: any) => ({...item, uuid: action.uuid}));
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, ...currentItem],
      };
    }

    case REMOVE_INGREDIENTS_FOR_CONSTRUCTOR: {
      const currentIngredient = state.constructorIngredients.filter((item: any) => item._id === action.payload)
      const ingredientsWithoutCurrent = state.constructorIngredients.filter((item: any) => item._id !== action.payload)
      if(currentIngredient.length === 1) {
        return {
          ...state,
          constructorIngredients:ingredientsWithoutCurrent
        }
      }
      return {
        ...state,
        constructorIngredients: [...ingredientsWithoutCurrent, ...currentIngredient.splice(currentIngredient.length -1, 1)],
      };
    }

    case ADD_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredientsData: state.ingredientsData.map((item: any) => {
          if(item._id === action.payload) {
            return {
              ...item,
              count: item.type === 'bun' ? item.count + 2 :item.count + 1
            }

          }
          else {
            return item
          }
        }),
      };
    }

    case REMOVE_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredientsData: state.ingredientsData.map((item: any) => {
          if(item._id === action.payload && item.count !== 0) {
            return {
              ...item,
              count: item.count - 1
            }

          }
          else {
            return item
          }
        }),
      };
    }

    case CHANGE_BUN: {
      const newBun: any = state.ingredientsData.filter((item: any) => item._id === action.payload)[0]
      const newBunPrice = newBun.price * 2
      return {
        ...state,
        bun: newBun,
        orderPrice: state.bun.price ? (state.orderPrice - state.bun.price * 2) + newBunPrice : newBunPrice,
        ingredientsData: state.ingredientsData.map((item: any) => {
          if(item._id === state.bun._id) {
            return {
              ...item,
              count: 0
            }
          }
          return item
        })
      };
    }

    case ADD_ORDER_PRICE: {
      return {
        ...state,
        orderPrice: state.orderPrice + action.payload
      };
    }

    case REMOVE_ORDER_PRICE: {
      return {
        ...state,
        orderPrice: state.orderPrice - action.payload
      };
    }

    case SORT_CONSTRUCTOR_ITEMS: {
      return {
        ...state,
        constructorIngredients: action.payload
      };
    }

    default: {
      return state;
    }
  }

}