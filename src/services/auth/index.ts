import { useCallback } from "react";
import { useSelector } from "react-redux";
const AUTH_URL = "https://norma.nomoreparties.space/api";

type TOptions = {
  method: string;
  headers: { "Content-Type": string; authorization?: string };
  body?: string;
};

type TResult = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
};

const authRequest = async (
  endpoint: string,
  body: {} | null,
  method: string,
  token?: string
) => {
  try {
    const options: TOptions = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    const accessToken = getAccessToken();
    if (accessToken) {
      options.headers.authorization = accessToken;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${AUTH_URL}${endpoint}`, options);
    const result: TResult = await response.json();

    if (result.success) {
      return result;
    }

    if (result.message === "jwt expired") {
      const result: TResult = await refreshToken();
      if (result.success) {
        options.headers.authorization = result.accessToken;
        const response = await fetch(`${AUTH_URL}${endpoint}`, options);
        return await response.json();
      }
      return result;
    }
    return result;
  } catch (err) {
    console.log(err);
  }
};

const postRequest = async (
  endpoint: string,
  body: {
    email?: string;
    password?: string;
    token?: string | null;
    name?: string;
  },
  accessToken: string = ""
) => {
  return authRequest(endpoint, body, "POST", accessToken);
};

const getRequest = async (endpoint: string, accessToken = "") => {
  return authRequest(endpoint, null, "GET", accessToken);
};

const patchRequest = async (
  endpoint: string,
  body: string | null,
  accessToken: string = ""
) => {
  return authRequest(endpoint, body, "PATCH", accessToken);
};

export const resetPassword = async (email: string) =>
  postRequest("/password-reset", { email });

export const updatePassword = async (password: string, token?: string) =>
  postRequest("/password-reset/reset", { password, token });

export const registerUser = async (
  email: string,
  name: string,
  password: string
) => postRequest("/auth/register", { email, name, password });

export const login = async (email: string, password: string) => {
  const result: TResult = await postRequest("/auth/login", { email, password });
  if (result.success) {
    setAccessToken(result.accessToken);
    setRefreshToken(result.refreshToken);
  }
  return result;
};

const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return { success: false };
  }
  const response = await fetch(`${AUTH_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken }),
  });
  const result: TResult = await response.json();
  if (result.success) {
    setAccessToken(result.accessToken);
    setRefreshToken(result.refreshToken);
  } else {
    setAccessToken("");
    setRefreshToken("");
  }
  return result;
};

export const logout = async () => {
  const result: TResult = await postRequest("/auth/logout", {
    token: getRefreshToken(),
  });
  if (result.success) {
    setAccessToken("");
    setRefreshToken("");
  }
  return result;
};

export const useUserData = () => {
  const { accessToken } = useSelector((state: any) => state.auth);
  const getUserData = useCallback(async () => {
    const result = await getRequest("/auth/user", accessToken);
    if (result.success) {
      return { ...result.user };
    } else {
      return { user: "", email: "" };
    }
  }, [accessToken]);

  const setUserData = useCallback(
    async (data) => {
      const result = await patchRequest("/auth/user", data, accessToken);
      return result;
    },
    [accessToken]
  );

  return {
    getUserData,
    setUserData,
  };
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const calcExpirationDate = (expiration: number | Date) => {
  if (typeof expiration == "number") {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expiration * 1000);
    return expirationDate.toUTCString();
  } else {
    return expiration.toUTCString();
  }
};

const toCookie = (params: Record<string, string | undefined>) => {
  return Object.entries(params)
    .map(([key, value]) => value ? `${key}=${encodeURIComponent(value)}` : undefined)
    .filter(param => param)
    .join("; ");
};

export const setCookie = (
  name: string,
  value: any,
  props: { expires?: number | Date } = {}
) => {
  const expires = props.expires ? calcExpirationDate(props.expires) : undefined;
  document.cookie = toCookie({ expires, [name]: encodeURIComponent(value) });
};

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: -1 });
};

const getAccessToken = () => getCookie("accessToken");

export const isLoggedIn = () => getAccessToken() !== undefined

const setAccessToken = (token?: string) => {
  if (token) {
    setCookie("accessToken", token);
  } else {
    deleteCookie("accessToken");
  }
};

export const getRefreshToken = () => localStorage.getItem("refreshToken");

const setRefreshToken = (token?: string) => {
  if (token) {
    localStorage.setItem("refreshToken", token);
  } else {
    localStorage.removeItem("refreshToken");
  }
};
