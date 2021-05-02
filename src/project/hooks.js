import { useContext, useEffect, useState } from 'react';
import ErrorContext from '../context/error';

const useFetchData = (url) => {
  const setError = useContext(ErrorContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoaded(false);

      let result;

      try {
        result = await fetch(url);
      } catch (err) {
        setError(err);
        return;
      }

      switch (result.status) {
        case 200:
          break;
        case 401:
        case 403:
        case 404:
        default:
          setError(result.status);
          return;
      }

      try {
        result = await result.json();
      } catch (err) {
        setError(err);
        return;
      }

      setData(result);
      setIsLoaded(true);
    })();

    return () => {
      setIsLoaded(false);
    };
  }, [url]);

  return [data, isLoaded];
};

export { useFetchData };
