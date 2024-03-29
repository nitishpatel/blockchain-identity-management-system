import { SetStateAction, useMemo, useState } from "react";
import axios, { AxiosResponse } from "axios";
import constate from "constate";
// import { toFormData } from "helpers/http";
import { API_URL } from "../config";
import { userTokenPersistence } from "../persistence";

// Define the API response type based on your application's response structure
interface UserData {
  user: unknown;
  token: string;
}

interface UserSignUpData {
  name: string;
  email: string;
  id: string
}

const useHttpApi_ = () => {
  const [token, setToken] = useState(userTokenPersistence.get());

  useMemo(() => {
    axios.defaults.baseURL = API_URL;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);





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
      const { token, user } = res;

      setToken(token);

      return { user, token };
    } catch (error: any) {
      // Handle error here
      throw new Error(error.response.data.error);
    }
  };

  const userLogout = async (): Promise<void> => {
    await get('/auth/signout');
  };


  const getCurrentUser = async (id: string | null): Promise<UserData> => {
    const res: { user: unknown; token: string } = await get(`/api/getuser/${id}`);
    return { user: res.user, token: res.token };
  };

  const signUp = async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<UserSignUpData> => {
    try {
      const res = await post<UserSignUpData>('/auth/signup', data);
      return res;
    } catch (error: any) {
      // Handle error here
      throw new Error(error.response.data.error);
    }
  };

  const getTxnUpdates = async (id: string): Promise<any> => {
    const res = await get(`identities/updates/${id}`);
    return res;
  };

  const addEducation = async (id: string, data: any): Promise<any> => {
    try {
      const res = await post(`/identities/education/`, {
        id,
        proof: data
      });
      return res;
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  };

  const addEmployment = async (id: string, data: any): Promise<any> => {
    try {
      const res = await post(`/identities/employment/`, {
        id,
        proof: data
      });
      return res;
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  };

  const approveEducation = async (id: string, proofId: string): Promise<any> => {
    try {
      const res = await post(`/identities/approve/education/`, {
        id,
        proofId
      });
      return res;
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  };
  const approveEmployment = async (id: string, proofId: string): Promise<any> => {
    try {
      const res = await post(`/identities/approve/employment/`, {
        id,
        proofId
      });
      return res;
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  };

  const getColleges = async (): Promise<any> => {
    const res = await get(`/api/colleges`);
    return res;
  };

  const getCompanies = async (): Promise<any> => {
    const res = await get(`/api/companies`);
    return res;
  };

  const getApprovals = async (id: string): Promise<any> => {
    const res = await get(`/api/approvals/${id}`);
    return res;
  }

  const shareData = async (id: string, organizationId: string): Promise<any> => {
    try {
      const res = await post(`/identities/share/`, {
        id,
        organizationId
      });
      return res;
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  }
  const getOrganization = async (): Promise<any> => {
    const res = await get(`/api/organizations`);
    return res;
  };
  const searchUser = async (id: string): Promise<any> => {
    const res = await get(`/api/search/${id}`);
    return res;
  };
  const getUserDataByOrg = async (id: string, orgId: string): Promise<any> => {
    const res = await get(`/api/getuserdata/${id}/${orgId}`);
    return res;
  };
  return {
    userLogin,
    userLogout,
    getCurrentUser,
    getTxnUpdates,
    signUp,
    addEducation,
    addEmployment,
    getColleges,
    getCompanies,
    getApprovals,
    approveEducation,
    approveEmployment,
    shareData,
    getOrganization,
    searchUser,
    getUserDataByOrg,
    get,
    post,
    put,
    patch,
    del,
  };
};

export const [HttpApiProvider, useHttpApi] = constate(useHttpApi_);