import {
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_DISCONNECT,
    WS_CLEAR_DATA
} from './consts';
import {
    IOpenWsConnectionAction,
    IWsClearWsDataAction,
    IWsCloseWsConnectionAction,
    IWsConectionClosedAction,
    IWsConectionFailedAction,
    IWsConectionSuccessAction,
    IWsGetMessageAction
} from './types/web-socket';
import { IOrdersData } from '../../types/type';

export const wsConectionSuccess = (): IWsConectionSuccessAction => {
    return {
        type: WS_CONNECTION_SUCCESS
    }
};

export const wsGetMessage = (payload: IOrdersData): IWsGetMessageAction => {
    return {
        type: WS_GET_MESSAGE,
        payload
    }
};

export const wsConectionFailed = (payload: any): IWsConectionFailedAction => {
    return {
        type: WS_CONNECTION_ERROR,
        payload
    }
};

export const wsConectionClosed = (): IWsConectionClosedAction => {
    return {
        type: WS_CONNECTION_CLOSED,
    }
};

export const openWsConnection = (payload: string): IOpenWsConnectionAction => ({
    type: WS_CONNECTION_START,
    payload,
});


export const closeWsConnection = (): IWsCloseWsConnectionAction => ({
    type: WS_DISCONNECT,
});

export const clearWsData = (): IWsClearWsDataAction => ({
    type: WS_CLEAR_DATA,
});