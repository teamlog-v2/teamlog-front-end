import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorPage from '../ErrorPage';

const ErrorContext = React.createContext(null);

const ErrorProvider = ({ children }) => {
  const history = useHistory();

  const [error, setError] = useState(null);

  // history가 변경되면 error를 null로 변경하기 위한 useEffect()
  useEffect(() => {
    const unlisten = history.listen(() => {
      setError(null);
    });

    return () => {
      unlisten();
    };
  }, [history]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <ErrorContext.Provider value={setError}>{children}</ErrorContext.Provider>
  );
};

export default ErrorContext;

export { ErrorProvider };
