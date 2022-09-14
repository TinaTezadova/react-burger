export const webSocketMiddleware = (wsUrl, wsActions) => {
    let socket = null;
    return (store) => (next) => (action) => {
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
  
        socket.onerror = (event) => {
          dispatch({...wsConectionFailed, payload: event});
        };
  
        socket.onclose = () => {
          dispatch(wsConectionClosed);
        };
  
        socket.onmessage = ({ data }) => {
          dispatch({...wsGetMessage, payload: JSON.parse(data)});
        };
      }
      return next(action);
    };
  };