import {
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_DISCONNECT,
    WS_CLEAR_DATA
} from '../consts';
import { IOrdersData } from '../../../types/type';

export interface IWsConectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
};

export interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: IOrdersData;
};

export interface IWsConectionFailedAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string;
};

export interface IWsConectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
};

export interface IOpenWsConnectionAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
};

export interface IWsCloseWsConnectionAction {
    readonly type: typeof WS_DISCONNECT;
};

export interface IWsClearWsDataAction {
    readonly type: typeof WS_CLEAR_DATA;
};

export type TWebSocketActions = IWsConectionSuccessAction | IWsGetMessageAction | IWsConectionFailedAction | IWsConectionClosedAction
| IOpenWsConnectionAction | IWsCloseWsConnectionAction | IWsClearWsDataAction;


export interface IWsMiddlwareActions {
    wsStart: typeof WS_CONNECTION_START,
    wsDisconnect: typeof WS_DISCONNECT,
    wsClearData: IWsClearWsDataAction,
    wsConectionSuccess: IWsConectionSuccessAction,
    wsConectionFailed: (arg: string) => IWsConectionFailedAction,
    wsGetMessage: (arg: IOrdersData) => IWsGetMessageAction,
    wsConectionClosed: IWsConectionClosedAction
}