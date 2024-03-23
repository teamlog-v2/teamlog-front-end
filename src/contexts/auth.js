import React, { useEffect, useState } from 'react';
import { validateLogin } from '../account/AccountService';

const AuthContext = React.createContext(null);

const tokens = { accessToken: null };
function getAccessToken() {
  return tokens.accessToken;
}
function setAccessToken(token) {
  tokens.accessToken = token;
}

fetch = ((origin) => (url, config) => {
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }

  const accessToken = getAccessToken();

  if (accessToken) config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return origin(url, config);
})(fetch);

const AuthProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [profileImgPath, setProfileImgPath] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access-token');
    if (!storedAccessToken) {
      setIsLoaded(true);
      return;
    }
    setAccessToken(storedAccessToken);

    (async () => {
      const response = await validateLogin();
      if (response.status === 401) {
        setIsLoaded(true);
        return;
      }

      const result = await response.json();

      if (!result.status) {
        setId(result.id);
        setProfileImgPath(result.profileImgPath);
      }
      setIsLoaded(true);
    })();
  }, []);

  // ==== render ========
  if (!isLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={[id, setId, profileImgPath, setProfileImgPath]}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

export { AuthProvider, getAccessToken, setAccessToken };
