export const BASE_API = 'https://norma.nomoreparties.space/api';

const checkResponse = (response) => {
    return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
};

export const getIngredients = async () => {
    return fetch(`${BASE_API}/ingredients`).then(checkResponse)
};