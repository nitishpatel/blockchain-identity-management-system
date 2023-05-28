import { useEffect, useState, useCallback } from "react";
import constate from "constate";
import { LOGIN_URL } from "../config";
import { userTokenPersistence } from "../persistence";
import { useNavigate } from "react-router";


const useAuthStateShared_ = () => {
  const [user, setUser] = useState<any | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isReady && !isAuthorized) {
      navigate(LOGIN_URL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, isAuthorized]);

  const setLoggedOutState = useCallback(() => {
    userTokenPersistence.clear();

    setUser(null);
    setIsAuthorized(false);
  }, []);

  return {
    user,
    setUser,
    setLoggedOutState,
    setIsReady,
    setIsAuthorized,
    isReady,
    isAuthorized,
  };
};

export const [
  AuthStateSharedProvider,
  useAuthStateShared,
  useSetLoggedOutState,
  useUser,
] = constate(
  useAuthStateShared_,
  (state) => state,
  ({ setLoggedOutState }) => setLoggedOutState,
  ({ user }) => user
);
