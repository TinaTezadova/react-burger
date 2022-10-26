import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { rootReducer } from '../services/reducers';
import { TAuthActions } from '../services/actions/types/auth';
import { TConstructorActions } from '../services/actions/types/constructor';
import { TWebSocketActions } from '../services/actions/types/web-socket';
export interface IIngredientItem {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    uuid: number,
    count: number
};

export interface IIngredientItemWithQuantity extends IIngredientItem {
    quantity: number
};

export interface IFindItemResult {
    el: IIngredientItem,
    currentIndex: number
};

export interface ICategory {
    name: string,
    description: string
};

export interface IConstructorIngredients extends IIngredientItem {
    uuId: string
}

export type TOrderStatuses = 'done' | 'created' | 'pending';

export interface IOrderItem {
    _id: string,
    name: string,
    status: TOrderStatuses,
    number: number,
    createdAt: string,
    updatedAt: string,
    ingredients: Array<IIngredientItem>,
    price: number
};

export type TOrder<T> = Omit<IOrderItem, 'ingredients'> & {
    ingredients: T,
};

export interface IOrdersData {
    success: boolean,
    orders: Array<TOrder<string[]>>,
    total: number,
    totalToday: number
};

export interface IBunData {
    name: string,
    price: number,
    image: string;
    _id: string;
};

export interface IEmailPassword {
    password: string,
    token: string
};
export interface ITokens {
    accessToken: string;
    refreshToken: string;
    success: boolean
};

export interface IUserInfoParams extends IEmailPassword {
    name: string;
}

export interface IUserEmailName {
    name: string;
    email: string;
}
export interface IOrderOwner extends IUserEmailName {
    createdAt: string;
    updatedAt: string;
}

export interface IOrderDetailResult {
    success: boolean;
    name: string;
    order: IOrderItem & IOrderOwner
}

export type RootState = ReturnType<typeof rootReducer>;
export type TApplicationActions = TAuthActions | TConstructorActions | TWebSocketActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TAuthActions | TConstructorActions | TWebSocketActions>;


export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
    [key in TDataKey]: TDataType
  } & {
    success: boolean;
    message?: string;
    headers?: Headers;
    accessToken?: string;
    refreshToken?: string
  };
  
  interface CustomBody<T extends any> extends Body {
    json(): Promise<T>;
  }
  
  export interface CustomResponse<T> extends CustomBody<T> {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer?: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
  }

  export interface ILocation {
    pathname: string;
    search: string;
    state: ILocation | null
    hash: string;
    key?: string | undefined;
}
  
  export interface ILocationWithBackground extends ILocation{
    background?: Omit<ILocation, 'background'>;
}