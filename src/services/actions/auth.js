import {
    RECOVERY_PASSWORD_REQUEST,
    RECOVERY_PASSWORD_SUCCESS,
    RECOVERY_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SET_USER,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
} from './consts';
import { passwordRecovery, postResetPassword, signInRequest, registrationReq, logoutReq, updateTokenRequest, getUserData, updateUserData } from '../../utils/burger-api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie'

export const recoveryPasswordRequest = () => {
    return {
        type: RECOVERY_PASSWORD_REQUEST
    }
}

export const recoveryPasswordSuccess = () => {
    return {
        type: RECOVERY_PASSWORD_SUCCESS
    }
}

export const recoveryPasswordFailed = () => {
    return {
        type: RECOVERY_PASSWORD_FAILED
    }
}


export const resetPasswordRequest = () => {
    return {
        type: RESET_PASSWORD_REQUEST
    }
}

export const resetPasswordSuccess = () => {
    return {
        type: RESET_PASSWORD_SUCCESS
    }
}

export const resetPasswordFailed = () => {
    return {
        type: RESET_PASSWORD_FAILED
    }
}


export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
}

export const loginFailed = () => {
    return {
        type: LOGIN_FAILED
    }
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const registrationRequest = () => {
    return {
        type: REGISTRATION_REQUEST
    }
}

export const registrationSuccess = () => {
    return {
        type: REGISTRATION_SUCCESS
    }
}

export const registrationFailed = () => {
    return {
        type: REGISTRATION_FAILED
    }
}

export const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    }
}

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFailed = () => {
    return {
        type: LOGOUT_FAILED
    }
}


export const getUserRequest = () => {
    return {
        type: GET_USER_REQUEST
    }
}

export const getUserSuccess = (userData) => {
    return {
        type: GET_USER_SUCCESS,
        payload: userData
    }
}

export const getUserFailed = () => {
    return {
        type: GET_USER_FAILED
    }
}

export const updateUserRequest = () => {
    return {
        type: UPDATE_USER_REQUEST
    }
}

export const updateUserSuccess = (user) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: user
    }
}

export const updateUserFailed = () => {
    return {
        type: UPDATE_USER_FAILED
    }
}

export const recoveryPassword = (params) => async (dispatch) => {
    try {
        dispatch(recoveryPasswordRequest());
        const res = await passwordRecovery(params)
        dispatch(recoveryPasswordSuccess());

    } catch (e) {
        dispatch(recoveryPasswordFailed());
        console.log(e)
    }
};

export const resetPassword = (params) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const res = await postResetPassword(params);
        dispatch(resetPasswordSuccess());

    } catch (e) {
        dispatch(resetPasswordFailed());
        console.log(e)
    }
};

const saveToken = (data) => {
    if (data.success) {
        const accessToken = data.accessToken.split('Bearer ')[1];
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', data.refreshToken);
    }
}


export const signIn = (params) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const data = await signInRequest(params);
        saveToken(data);
        dispatch(setUser({ ...data.user, id: data.user._id }));
        dispatch(loginSuccess());


    } catch (e) {
        dispatch(loginFailed());
        console.log(e)
    }
};


export const registration = (params) => async (dispatch) => {
    try {
        dispatch(registrationRequest());
        const data = await registrationReq(params);
        saveToken(data);
        dispatch(setUser({ ...data.user, id: data.user._id }));
        dispatch(registrationSuccess());


    } catch (e) {
        dispatch(registrationFailed());
        console.log(e)
    }
};


export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const data = await logoutReq(getCookie('refreshToken'));
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(logoutSuccess());


    } catch (e) {
        dispatch(logoutFailed());
        console.log(e)
    }
};


export const updateToken = () => async (dispatch) => {
    try {
        const data = await updateTokenRequest(getCookie('refreshToken'));
        deleteCookie('accessToken');
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
        dispatch(getUser())


    } catch (e) {
        console.log(e)
    }
};



export const getUser = () => async (dispatch) => {
    try {
        dispatch(getUserRequest());
        const data = await getUserData(getCookie('accessToken'));
        dispatch(getUserSuccess(data.user));


    } catch (e) {
        dispatch(getUserFailed());
        dispatch(updateToken())
        console.log(e)
    }
};


export const updateUser = (params) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());
        const data = await updateUserData(params, getCookie('accessToken'));
        dispatch(updateUserSuccess(data.user));


    } catch (e) {
        dispatch(updateUserFailed());
        console.log(e)
    }
};