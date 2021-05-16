import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import storage from '../utils/storage';
import { getActiveUserAction, logoutAction } from '../containers/App/actions';
import { routes } from '../constants/routes';

const initialAuthData = {
  id: null,
  token: null,
  user: null,
};

export const AuthDataContext = createContext(initialAuthData);

const AuthDataProvider = props => {
  const storageId = storage.getUserId();
  const storageToken = storage.getToken();
  const storageUser = storage.getUser();
  const [authData, setAuthData] = useState({
    ...initialAuthData,
    id: storageId,
    token: storageToken,
    user: storageUser,
  });
  const dispatch = useDispatch();

  /* The first time the component is rendered, it tries to
   * fetch the auth data from a source, like a cookie or
   * the localStorage.
   */
  useEffect(() => {
    // const id = storage.getUserId();
    // const token = storage.getToken();
    // setAuthData({ id, token });
    if (storageId && storageToken && !storageUser) {
      dispatch(
        getActiveUserAction({
          id: storageId,
          callback: user => {
            storage.setUser(user);
            setAuthData({ id: storageId, token: storageToken, user });
          },
        }),
      );
    }
  }, []);

  const onLogout = () => {
    dispatch(logoutAction());
    storage.clearUserData();
    setAuthData(initialAuthData);
    window.location = routes.HOME;
  };

  const onLogin = ({ id, token }) => {
    storage.setToken(token);
    storage.setUserId(id);
    setAuthData({ id, token });
    if (id && token) {
      dispatch(
        getActiveUserAction({
          id,
          callback: user => {
            storage.setUser(user);
            setAuthData({ id, token, user });
          },
        }),
      );
    }
    // setAuthData(newAuthData);
  };

  const authDataValue = useMemo(() => ({ ...authData, onLogin, onLogout }), [
    authData,
  ]);

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
