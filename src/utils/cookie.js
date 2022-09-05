export function setCookie(name, token) {
    const value = encodeURIComponent(token);
    const updatedCookie = name + '=' + value;
    document.cookie = updatedCookie;
}

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
    setCookie(name, null);
}