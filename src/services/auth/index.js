import { useCallback } from "react"
import { useSelector } from "react-redux"
const AUTH_URL = 'https://norma.nomoreparties.space/api'

const authRequest = async (endpoint, body, method) => {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        }
        const accessToken = getAccessToken()
        if (accessToken) {
            options.headers.authorization = accessToken
        }

        if (body) {
            options.body = JSON.stringify(body)
        }

        const response = await fetch(`${AUTH_URL}${endpoint}`, options)
        const result = await response.json()

        if (result.success) {
            return result;
        }

        if (result.message === "jwt expired") {
            const result = await refreshToken()
            if (result.success) {
                options.headers.authorization = result.accessToken
                const response = await fetch(`${AUTH_URL}${endpoint}`, options)
                return await response.json()
            }
            return result;
        }
        return result
    }
    catch (err) {
        console.log(err);
    }
}

const postRequest = async (endpoint, body, accessToken = '') => {
    return authRequest(endpoint, body, "POST", accessToken)
}

const getRequest = async (endpoint, accessToken = '') => {
    return authRequest(endpoint, null, "GET", accessToken)
}

const patchRequest = async (endpoint, body, accessToken = '') => {
    return authRequest(endpoint, body, "PATCH", accessToken)
}

export const resetPassword = async email => postRequest('/password-reset', { email })


export const updatePassword = async (password, token) => postRequest('/password-reset/reset', { password, token })


export const registerUser = async (email, name, password) => postRequest('/auth/register', { email, name, password })


export const login = async (email, password) => {
    const result = await postRequest('/auth/login', { email, password })
    if (result.success) {
        setAccessToken(result.accessToken)
        setRefreshToken(result.refreshToken)
    }
    return result
}

const refreshToken = async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
        return { sussess: false }
    }
    const response = await fetch(`${AUTH_URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken })
    })
    const result = response.json()
    if (result.success) {
        setAccessToken(result.accessToken)
        setRefreshToken(result.refreshToken)
    } else {
        setAccessToken('')
        setRefreshToken('')
    }
    return result
}



export const logout = async () => {
    const result = await postRequest('/auth/logout', { token: getRefreshToken() })
    if (result.success) {
        setAccessToken('')
        setRefreshToken('')
    }
    return result
}

export const useUserData = () => {
    const { accessToken } = useSelector(state => state.auth)
    const getUserData = useCallback(async () => {
        const result = await getRequest("/auth/user", accessToken)
        if (result.success) {
            return { ...result.user }
        } else {
            return { user: "", email: "" }
        }
    }, [accessToken])

    const setUserData = useCallback(async (data) => {
        const result = await patchRequest("/auth/user", data, accessToken)
        return result
    }, [accessToken])


    return {
        getUserData, setUserData
    }
}

export const getCookie = (name) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const setCookie = (name, value, props) => {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export const deleteCookie = (name) => {
    setCookie(name, null, { expires: -1 });
}

const getAccessToken = () =>
    getCookie('accessToken')


const setAccessToken = (token) => {
    if (token) {
        setCookie('accessToken', token)
    }
    else {
        deleteCookie('accessToken')
    }
}

export const getRefreshToken = () =>
    localStorage.getItem('refreshToken')

const setRefreshToken = (token) => {
    if (token) {
        localStorage.setItem('refreshToken', token)
    } else {
        localStorage.removeItem('refreshToken')
    }
}