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
} from '../consts';
import { IUserEmailName } from '../../../types/type';

export interface IRecoveryPasswordRequestAction {
    readonly type: typeof RECOVERY_PASSWORD_REQUEST;
};

export interface IRecoveryPasswordSuccessAction {
    readonly type: typeof RECOVERY_PASSWORD_SUCCESS;
};

export interface IRecoveryPasswordFailedAction {
    readonly type: typeof RECOVERY_PASSWORD_FAILED;
};

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
};

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
};

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
};

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
};

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
};

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
};

export interface ISetUserAction {
    readonly type: typeof SET_USER;
    readonly payload: IUserEmailName
};

export interface IRegistrationRequestAction {
    readonly type: typeof REGISTRATION_REQUEST;
};

export interface IRegistrationSuccessAction {
    readonly type: typeof REGISTRATION_SUCCESS;
};

export interface IRegistrationFailedAction {
    readonly type: typeof REGISTRATION_FAILED;
};

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
};

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
};

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
};

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
};

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly payload: IUserEmailName
};

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
};

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
};

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly payload: IUserEmailName
};

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
};

export interface IUpdateTokenFailedAction {
    readonly type: typeof UPDATE_TOKEN_FAILED;
};

export interface IUpdateTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
};

export type TAuthActions = IRecoveryPasswordRequestAction | IRecoveryPasswordSuccessAction | IRecoveryPasswordFailedAction | IResetPasswordRequestAction 
| IResetPasswordSuccessAction | IResetPasswordFailedAction | ILoginRequestAction | ILoginSuccessAction | ILoginFailedAction | ISetUserAction | IRegistrationRequestAction
| IRegistrationSuccessAction | IRegistrationFailedAction | ILogoutRequestAction | ILogoutSuccessAction | ILogoutFailedAction | IGetUserRequestAction | IGetUserSuccessAction
| IGetUserFailedAction | IUpdateUserRequestAction | IUpdateUserSuccessAction | IUpdateUserFailedAction | IUpdateTokenFailedAction | IUpdateTokenSuccessAction;