export const BASE_API = 'https://norma.nomoreparties.space/api';

const checkResponse = (response) => {
    return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
};

export const getIngredients = async () => {
    return fetch(`${BASE_API}/ingredients`).then(checkResponse)
};

export const getOrder = async (ingredients, token) => {
    return fetch(`${BASE_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ingredients)
    }).then(checkResponse)
};

export const passwordRecovery = async (email) => {
    return fetch(`${BASE_API}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    }).then(checkResponse)
};

export const postResetPassword = async (params) => {
    return fetch(`${BASE_API}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(checkResponse)
};

export const signInRequest = async (params) => {
    return fetch(`${BASE_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(checkResponse)
};

export const registrationReq = async (params) => {
    return fetch(`${BASE_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(checkResponse)
};

export const logoutReq = async (token) => {
    return fetch(`${BASE_API}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    }).then(checkResponse)
};

export const updateTokenRequest = async (token) => {
    return fetch(`${BASE_API}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    }).then(checkResponse)
};

export const getUserData = async (token) => {
    return fetch(`${BASE_API}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    }).then(checkResponse)
};

export const updateUserData = async (params, token) => {
    return fetch(`${BASE_API}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(params)
    }).then(checkResponse)
};