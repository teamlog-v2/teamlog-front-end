import React, { useEffect, useState } from 'react';
import ErrorPage from '../pages/ErrorPage';

const SignContext = React.createContext(null);

const SignProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await validateLogin();
        if (response.status === 200) {
          setUserId();
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <SignContext.Provider value={{ userId }}>{children}</SignContext.Provider>
  );
};

export default SignContext;

export { SignProvider };
