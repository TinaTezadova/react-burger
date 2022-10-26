import { Middleware } from 'redux';
import { IWsMiddlwareActions } from '../actions/types/web-socket';
import { RootState, AppDispatch } from '../../types/type'

export const webSocketMiddleware = (wsUrl: string, wsActions: IWsMiddlwareActions): Middleware<{}, RootState, AppDispatch> => {
    let socket: WebSocket | null = null;
    return (store) => (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, wsDisconnect, wsClearData, wsConectionSuccess, wsConectionFailed, wsGetMessage, wsConectionClosed, } = wsActions;
  
      if (type === wsStart) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (type === wsDisconnect && socket) {
        dispatch(wsClearData);
        socket.close(1000, 'Сlose the connection');
        socket = null;
      }
  
      if (socket) {
        socket.onopen = () => {
          dispatch(wsConectionSuccess);
        };
  
        socket.onerror = () => {
          dispatch(wsConectionFailed('wsConectionFailed'));
        };
  
        socket.onclose = () => {
          dispatch(wsConectionClosed);
        };
  
        socket.onmessage = ({ data } : MessageEvent) => { 
          dispatch(wsGetMessage(JSON.parse(data)));
        };
      }
      return next(action);
    };
  };