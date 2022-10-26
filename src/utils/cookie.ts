export function setCookie(name: string, token: string): void {
    const value = encodeURIComponent(token);
    const updatedCookie = name + '=' + value;
    document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
        // eslint-disable-next-line no-useless-escape
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
    setCookie(name, '');
}