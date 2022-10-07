import { IWsMiddlwareActions, TWebSocketActions } from '../actions/types/web-socket';
export const webSocketMiddleware = (wsUrl: string, wsActions: IWsMiddlwareActions) => {
    let socket: any = null;
    return (store: { dispatch: any; }) => (next: (action: TWebSocketActions) => void) => (action: TWebSocketActions & {payload: any}) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, wsDisconnect, wsClearData, wsConectionSuccess, wsConectionFailed, wsGetMessage, wsConectionClosed, } = wsActions;
  
      if (type === wsStart) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (type === wsDisconnect) {
        dispatch(wsClearData);
        socket.close(1000, 'Сlose the connection');
        socket = null;
      }
  
      if (socket) {
        socket.onopen = () => {
          dispatch(wsConectionSuccess);
        };
  
        socket.onerror = (event: any) => {
          dispatch(wsConectionFailed(event));
        };
  
        socket.onclose = () => {
          dispatch(wsConectionClosed);
        };
  
        socket.onmessage = ({ data }: any) => {
          dispatch(wsGetMessage(JSON.parse(data)));
        };
      }
      return next(action);
    };
  };