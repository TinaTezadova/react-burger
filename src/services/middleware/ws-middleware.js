import {WS_CONNECTION_START, WS_DISCONNECT, wsConectionSuccess, wsConectionFailed, wsConectionClosed, wsGetMessage, clearWsData } from '../actions/web-socket';
export const webSocketMiddleware = (wsUrl) => {
    let socket = null;
    return (store) => (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
  
      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
  


      if (type === WS_DISCONNECT) {
        dispatch(clearWsData());
        socket.close(1000, 'Сlose the connection');
        socket = null;
      }
  
      if (socket) {
        socket.onopen = () => {
          dispatch(wsConectionSuccess);
        };
  
        socket.onerror = (event) => {
          dispatch(wsConectionFailed(event));
        };
  
        socket.onclose = () => {
          dispatch(wsConectionClosed());
        };
  
        socket.onmessage = ({ data }) => {
          dispatch(wsGetMessage(JSON.parse(data)));
        };
      }
      return next(action);
    };
  };