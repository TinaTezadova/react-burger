import { 
    WS_CONNECTION_START, 
    WS_DISCONNECT, 
    wsConectionSuccess, 
    wsConectionFailed, 
    wsConectionClosed, 
    wsGetMessage, 
    clearWsData 
} from '../services/actions/web-socket';

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