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
        regist(result.id);
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

/** pusher test **/
const regist = (id) => {
  try {
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: "9626f19b-467e-44bb-9702-f4ea986cab5e",
    });
  
    beamsClient
      .start()
      .then((beamsClient) => beamsClient.getDeviceId())
      .then((deviceId) =>
        console.log("Successfully registered with Beams. Device ID:", deviceId)
      )
      .then(() => beamsClient.addDeviceInterest(id)) // 본인 아이디
      .then(() => beamsClient.getDeviceInterests())
      .then((interests) => console.log("Current interests:", interests))
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
}

export default AuthContext;

export { AuthProvider, getAccessToken, setAccessToken };
