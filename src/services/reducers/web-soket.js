import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CLEAR_DATA,
} from '../actions/web-socket';

const initialState = {
    connectedSuccess: false,
    errorInfo: null,
    ordersData: [],
};

export const webSocketReducer = (state = initialState, action) => {
    switch (action.type) {

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                connectedSuccess: true,
                errorInfo: null
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                connectedSuccess: false,
                errorInfo:
                    action.payload
            };


        case WS_GET_MESSAGE:
            return {
                ...state,
                ordersData: action.payload
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                connectedSuccess: false,
                errorInfo: null
            };

        case WS_CLEAR_DATA:
            return {
                ...state,
                ordersData: initialState.ordersData
            };

        default: return state;
    }
};