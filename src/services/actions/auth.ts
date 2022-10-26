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
    UPDATE_TOKEN_FAILED,
    UPDATE_TOKEN_SUCCESS
} from './consts';
import { passwordRecovery, postResetPassword, signInRequest, registrationReq, logoutReq, updateTokenRequest, getUserData, updateUserData } from '../../utils/burger-api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import {
    IGetUserFailedAction,
    IGetUserRequestAction,
    IGetUserSuccessAction,
    ILoginFailedAction,
    ILoginRequestAction,
    ILoginSuccessAction,
    ILogoutFailedAction,
    ILogoutRequestAction,
    ILogoutSuccessAction,
    IRecoveryPasswordFailedAction,
    IRecoveryPasswordRequestAction,
    IRecoveryPasswordSuccessAction,
    IRegistrationFailedAction,
    IRegistrationRequestAction,
    IRegistrationSuccessAction,
    IResetPasswordFailedAction,
    IResetPasswordRequestAction,
    IResetPasswordSuccessAction,
    ISetUserAction,
    IUpdateUserFailedAction,
    IUpdateUserRequestAction,
    IUpdateUserSuccessAction,
    IUpdateTokenFailedAction,
    IUpdateTokenSuccessAction
} from './types/auth';
import { AppThunk, AppDispatch, IEmailPassword, IUserInfoParams, IUserEmailName, TResponseBody } from '../../types/type';

export const recoveryPasswordRequest = (): IRecoveryPasswordRequestAction => {
    return {
        type: RECOVERY_PASSWORD_REQUEST
    }
}

export const recoveryPasswordSuccess = (): IRecoveryPasswordSuccessAction => {
    return {
        type: RECOVERY_PASSWORD_SUCCESS
    }
}

export const recoveryPasswordFailed = (): IRecoveryPasswordFailedAction => {
    return {
        type: RECOVERY_PASSWORD_FAILED
    }
}


export const resetPasswordRequest = (): IResetPasswordRequestAction => {
    return {
        type: RESET_PASSWORD_REQUEST
    }
}

export const resetPasswordSuccess = (): IResetPasswordSuccessAction => {
    return {
        type: RESET_PASSWORD_SUCCESS
    }
}

export const resetPasswordFailed = (): IResetPasswordFailedAction => {
    return {
        type: RESET_PASSWORD_FAILED
    }
}


export const loginRequest = (): ILoginRequestAction => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginSuccess = (): ILoginSuccessAction => {
    return {
        type: LOGIN_SUCCESS
    }
}

export const loginFailed = (): ILoginFailedAction => {
    return {
        type: LOGIN_FAILED
    }
}

export const setUser = (user: IUserEmailName): ISetUserAction => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const registrationRequest = (): IRegistrationRequestAction => {
    return {
        type: REGISTRATION_REQUEST
    }
}

export const registrationSuccess = (): IRegistrationSuccessAction => {
    return {
        type: REGISTRATION_SUCCESS
    }
}

export const registrationFailed = (): IRegistrationFailedAction => {
    return {
        type: REGISTRATION_FAILED
    }
}

export const logoutRequest = (): ILogoutRequestAction => {
    return {
        type: LOGOUT_REQUEST
    }
}

export const logoutSuccess = (): ILogoutSuccessAction => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFailed = (): ILogoutFailedAction => {
    return {
        type: LOGOUT_FAILED
    }
}


export const getUserRequest = (): IGetUserRequestAction => {
    return {
        type: GET_USER_REQUEST
    }
}

export const getUserSuccess = (userData: IUserEmailName): IGetUserSuccessAction => {
    return {
        type: GET_USER_SUCCESS,
        payload: userData
    }
}

export const getUserFailed = (): IGetUserFailedAction => {
    return {
        type: GET_USER_FAILED
    }
}

export const updateUserRequest = (): IUpdateUserRequestAction => {
    return {
        type: UPDATE_USER_REQUEST
    }
}

export const updateUserSuccess = (user: IUserEmailName): IUpdateUserSuccessAction => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: user
    }
}

export const updateUserFailed = (): IUpdateUserFailedAction => {
    return {
        type: UPDATE_USER_FAILED
    }
}

export const updateTokenSuccess = (): IUpdateTokenSuccessAction => {
    return {
        type: UPDATE_TOKEN_SUCCESS
    }
}

export const updateTokenFailed = (): IUpdateTokenFailedAction => {
    return {
        type: UPDATE_TOKEN_FAILED
    }
}

export const recoveryPassword: AppThunk = (params: {email: string}) => async (dispatch: AppDispatch) => {
    try {
        dispatch(recoveryPasswordRequest());
        const res = await passwordRecovery(params);
        console.log(res);
        
        dispatch(recoveryPasswordSuccess());

    } catch (e) {
        dispatch(recoveryPasswordFailed());
        console.log(e)
    }
};

export const resetPassword: AppThunk = (params: IEmailPassword) => async (dispatch: AppDispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const res = await postResetPassword(params);
        console.log(res);
        dispatch(resetPasswordSuccess());

    } catch (e) {
        dispatch(resetPasswordFailed());
        console.log(e)
    }
};

const saveToken = (data: TResponseBody<"user", IUserEmailName>) => {
    if (data.success && data.accessToken && data.refreshToken) {
        const accessToken = data.accessToken.split('Bearer ')[1];
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', data.refreshToken);
    }
}


export const signIn: AppThunk = (params: IEmailPassword) => async (dispatch: AppDispatch) => {
    try {
        dispatch(loginRequest());
        const data = await signInRequest(params);
        saveToken(data);
        dispatch(setUser(data.user));
        dispatch(loginSuccess());


    } catch (e) {
        dispatch(loginFailed());
        console.log(e)
    }
};


export const registration: AppThunk = (params: IUserInfoParams) => async (dispatch: AppDispatch) => {
    try {
        dispatch(registrationRequest());
        const data = await registrationReq(params);
        saveToken(data);
        dispatch(setUser(data.user));
        dispatch(registrationSuccess());


    } catch (e) {
        dispatch(registrationFailed());
        console.log(e)
    }
};


export const logout: AppThunk = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(logoutRequest());
        const data = await logoutReq(getCookie('refreshToken'));
        console.log(data);
        
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(logoutSuccess());


    } catch (e) {
        dispatch(logoutFailed());
        console.log(e)
    }
};


export const updateToken: AppThunk = () => async (dispatch: AppDispatch) => {
    try {
        const data = await updateTokenRequest(getCookie('refreshToken'));
        if(data.accessToken) {
            setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
            dispatch(updateTokenSuccess())
        }
        
    } catch (e) {
        dispatch(updateTokenFailed())
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        console.log(e);
    }
};



export const getUser: AppThunk = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(getUserRequest());
        const data = await getUserData(getCookie('accessToken'));
        dispatch(getUserSuccess(data.user));


    } catch (e) {
        dispatch(getUserFailed());
        console.log(e)
    }
};


export const updateUser: AppThunk = (params: IUserInfoParams) => async (dispatch: AppDispatch) => {
    try {
        dispatch(updateUserRequest());
        const data = await updateUserData(params, getCookie('accessToken'));
        dispatch(updateUserSuccess(data.user));


    } catch (e) {
        dispatch(updateUserFailed());
        console.log(e)
    }
};