import { 
    WS_CONNECTION_START, 
    WS_DISCONNECT, 
    wsConectionSuccess, 
    wsConectionFailed, 
    wsConectionClosed, 
    wsGetMessage, 
    clearWsData 
} from '../services/actions/web-socket';
import { getCookie } from './cookie';

export const WsURL = 'wss://norma.nomoreparties.space/orders';

export const WS_ACTIONS = {
    wsStart: WS_CONNECTION_START,
    wsDisconnect: WS_DISCONNECT,
    wsClearData: clearWsData(),
    wsConectionSuccess: wsConectionSuccess(),
    wsConectionFailed: wsConectionFailed(),
    wsGetMessage: wsGetMessage(),
    wsConectionClosed: wsConectionClosed()
}

export const WS_ENDPOINT_ALL = '/all';
export const WS_ENDPOINT_POFILE_ORDERS = `?token=${getCookie('accessToken')}`