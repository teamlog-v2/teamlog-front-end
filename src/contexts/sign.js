import React, { useEffect, useState } from 'react';
// import { validateLogin } from '../user/userService';

const SignContext = React.createContext(null);

const SignProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setUserId('migu554');
      setIsLoaded(true);
      // try {
      //   const response = await validateLogin();
      //   if (response.status === 200) {
      //     const id = (await response.json()).message;
      //     setUserId(id);
      //     setIsLoaded(true);
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    })();
  }, []);

  if (!isLoaded) return null;

  return (
    <SignContext.Provider value={{ userId }}>{children}</SignContext.Provider>
  );
};

export default SignContext;

export { SignProvider };
