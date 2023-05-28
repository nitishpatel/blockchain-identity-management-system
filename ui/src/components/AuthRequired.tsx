import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthState } from "../state/useAuthState";
import { useAuthStateShared } from "../state/useAuthStateShared";

interface Props {
  children: React.ReactNode;
}

const AuthRequired: React.FC<Props> = ({ children }) => {
  const { isAuthorized, initAuth } = useAuthState();
  const { user } = useAuthStateShared();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    initAuth();
    if (user) {
      navigate("/admin");
    }
    if (user && location?.pathname !== "/admin") {
      navigate(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return isAuthorized ? children : null;
};

export default AuthRequired;
