export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_CLEAR_DATA = 'WS_CLEAR_DATA';

export const wsConectionSuccess = () => {
    return {
        type: WS_CONNECTION_SUCCESS
    }
};

export const wsGetMessage = (payload) => {
    return {
        type: WS_GET_MESSAGE,
        payload
    }
};

export const wsConectionFailed = (payload) => {
    return {
        type: WS_CONNECTION_ERROR,
        payload
    }
};

export const wsConectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED,
    }
};

export const openWsConnection = (payload) => ({
    type: WS_CONNECTION_START,
    payload,
});


export const closeWsConnection = () => ({
    type: WS_DISCONNECT,
});

export const clearWsData = () => ({
    type: WS_CLEAR_DATA,
});