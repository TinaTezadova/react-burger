import { IUserEmailName } from '../../../types/type';
export interface IUserData {
    email: string,
    name: string 
}
export type TAuthState = {
    passwordRecoveryRequest: boolean,
    passwordRecoveryFailed: boolean,
    passwordRecoverySuccess: boolean,
    resetPasswordRequest: boolean,
    resetPasswordSuccess: boolean,
    resetPasswordFailed: boolean,
    loginRequest: boolean,
    loginFailed: boolean,
    user: IUserEmailName | null,
    registrationRequest: boolean,
    registrationFailed: boolean,
    logoutRequest: boolean,
    logoutFailed: boolean,
    getUserRequest: boolean,
    getUserFailed: boolean,
    userData: IUserData,
    updateUserRequest: boolean,
    updateUserFailed: boolean,
    updateTokenSuccess: boolean,
    updateTokenFailed: boolean
}