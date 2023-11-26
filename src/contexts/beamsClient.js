import React, { useEffect, useState } from 'react';

const BeamsClientContext = React.createContext(null);

const BeamsClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: '9626f19b-467e-44bb-9702-f4ea986cab5e',
      });
      setClient(beamsClient);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
      setIsLoaded(true);
    }
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
