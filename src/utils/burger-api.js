export const BASE_API = 'https://norma.nomoreparties.space/api';

const checkResponse = (response) => {
    return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
};

export const getIngredients = async () => {
    return fetch(`${BASE_API}/ingredients`).then(checkResponse)
};

export const getOrder = async (ingredients) => {
    return fetch(`${BASE_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredients)
    }).then(checkResponse)
};