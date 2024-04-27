import React, { useEffect, useState } from 'react';

const BeamsClientContext = React.createContext(null);

const BeamsClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <BeamsClientContext.Provider value={[client, setClient]}>{children}</BeamsClientContext.Provider>
  );
};

export default BeamsClientContext;

export { BeamsClientProvider };
