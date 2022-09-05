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
} from '../actions/consts';

const initialState = {
  passwordRecoveryRequest: false,
  passwordRecoveryFailed: false,
  passwordRecoverySuccess: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  loginRequest: false,
  loginFailed: false,
  user: null,
  registrationRequest: false,
  registrationFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  userData: {
    email: '',
    name: ''
  },
  updateUserRequest: false,
  updateUserFailed: false

};


export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case RECOVERY_PASSWORD_REQUEST: {
      return {
        ...state,
        passwordRecoveryRequest: true
      };
    }

    case RECOVERY_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordRecoveryRequest: false,
        passwordRecoverySuccess: true
      };
    }

    case RECOVERY_PASSWORD_FAILED: {
      return {
        ...state,
        passwordRecoveryRequest: false,
        passwordRecoverySuccess: false,
        passwordRecoveryFailed: true
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true
      };
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: false,
        resetPasswordFailed: true
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
      };
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true
      };
    }

    case SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true
      };
    }

    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
      };
    }

    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        user: null
      };
    }

    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      };
    }

    case GET_USER_SUCCESS: {

      return {
        ...state,
        getUserRequest: false,
        userData: action.payload
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        userData: initialState.userData,
        getUserFailed: true
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        userData: action.payload
      };
    }

    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: true
      };
    }


    default: {
      return state;
    }
  }

}