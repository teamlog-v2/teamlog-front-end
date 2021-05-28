/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { validateLogin } from '../user/userService';

const AuthContext = React.createContext(null);

const tokens = { accessToken: '' };
function getAccessToken() {
  return tokens.accessToken;
}
function setAccessToken(token) {
  tokens.accessToken = token;
}

fetch = ((origin) => {
  return (url, config) => {
    if (!config) {
      config = {};
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['Authorization'] = getAccessToken();
    return origin(url, config);
  }
})(fetch);

const AuthProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [profileImgPath, setProfileImgPath] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access-token');
    if (!storedAccessToken) {
      setIsLoaded(true);
      return;
    }
    setAccessToken(storedAccessToken);

    (async () => {
      const response = await validateLogin();
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
