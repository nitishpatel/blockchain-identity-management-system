import { SetStateAction, useMemo, useState } from "react";
import axios, { AxiosResponse } from "axios";
import constate from "constate";
// import { toFormData } from "helpers/http";
import { API_URL } from "../config";
import { userTokenPersistence } from "../persistence";
import { useSetLoggedOutState } from "./useAuthStateShared";

// Define the API response type based on your application's response structure

const useHttpApi_ = () => {
  const [token, setToken] = useState(userTokenPersistence.get());
  const setLoggedOutState = useSetLoggedOutState();

  useMemo(() => {
    axios.defaults.baseURL = API_URL;
    axios.defaults.headers.common["Authorization"] = token;
  }, [token]);



  const getCurrentUser = async (): Promise<{ user: string; token: string }> => {
    const res = await axios.get("/user");
    return res.data;
  };

  const get = async <T>(url: string): Promise<T> => {
    const res = await axios.get(url);
    return res.data;
  };

  const post = async <T>(url: string, data: unknown): Promise<T> => {
    const res = await axios.post(url, data);
    return res.data;
  };

  const put = async <T>(url: string, data: unknown): Promise<T> => {
    const res = await axios.put(url, data);
    return res.data;
  };

  const patch = async <T>(url: string, data: unknown): Promise<T> => {
    const res = await axios.patch(url, data);
    return res.data;
  };

  const del = async <T>(url: string): Promise<T> => {
    const res = await axios.delete(url);
    return res.data;
  };

  const userLogin = async (data: {
    email: string;
    password: string;
  }): Promise<{ user: any; token: string }> => {
    try {
      const res = await post<{
        user: any, token: string
      }>('/auth/signin', data);
      console.log(res);
      const { token, user } = res;
      console.log(token);
      console.log(user);
      setToken(token);

      return { user, token };
    } catch (error: any) {
      // Handle error here
      throw new Error(error.response.data.error);
    }
  };

  const userLogout = async (): Promise<void> => {
    await post('/logout', {});
    setLoggedOutState();
  };

  return {
    userLogin,
    userLogout,
    getCurrentUser,
    get,
    post,
    put,
    patch,
    del,
  };
};

export const [HttpApiProvider, useHttpApi] = constate(useHttpApi_);