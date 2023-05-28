import constate from 'constate';
import { useHttpApi } from './useHttpApi';
import { userTokenPersistence, userNamePersistence } from '../persistence';
import { useAuthStateShared } from './useAuthStateShared';
const useAuthState_ = () => {
  const { userLogin, userLogout, getCurrentUser } = useHttpApi();
  const { user, setUser, setLoggedOutState, setIsReady, setIsAuthorized, isReady, isAuthorized } =
    useAuthStateShared();

  const initAuth = async () => {
    if (isReady) {
      return;
    }
    const user = userNamePersistence.get();
    setUser(user);
    setIsAuthorized(true);

    if (!user) {
      setLoggedOutState();
      setIsReady(true);
    }
    const token = userTokenPersistence.get();
    if (!token) {
      setLoggedOutState();
      setIsReady(true);
    }
    try {
      const id = userNamePersistence.get();
      const { user, token } = await getCurrentUser(id);
      setUser(user);
      setIsAuthorized(true);
    } catch (e) {
      setLoggedOutState();
    } finally {
      setIsReady(true);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await userLogin({ email, password });
    userNamePersistence.set(res.user._id);
    userTokenPersistence.set(res.token);
    setUser(res.user);
    setIsAuthorized(true);
    setIsReady(true);
  };

  const logout = async () => {
    const name = userNamePersistence.get();
    await userLogout();
    setLoggedOutState();
    localStorage.clear();
  };

  return {
    user,
    isReady,
    isAuthorized,
    login,
    initAuth,
    logout
  };
};
export const [AuthStateProvider, useAuthState] = constate(useAuthState_);