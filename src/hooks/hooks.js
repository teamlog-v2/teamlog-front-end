import { useContext, useEffect, useState } from 'react';
import ErrorContext from '../contexts/error';

function Publisher(url) {
  this.url = url;
  this.data = null;
  this.error = null;
  this.subscribers = [];
  this.isLoaded = false;
  this.isLoading = false;
}

Publisher.prototype.subscribe = function (callback) {
  this.subscribers.push(callback);
  if (this.isLoaded) {
    callback(this.data);
  }
  this.update();
};

Publisher.prototype.unsubscribe = function (callback) {
  const index = this.subscribers.indexOf(callback);
  if (index !== -1) {
    this.subscribers.splice(index, 1);
  }
};

Publisher.prototype.publish = function () {
  this.subscribers.forEach((callback) => {
    callback(this.data);
  });
};

Publisher.prototype.update = async function () {
  if (this.isLoading) {
    return;
  }
  this.isLoading = true;

  let result;

  try {
    result = await fetch(this.url);
  } catch (err) {
    this.error = err;
    this.isLoading = false;
    return;
  }

  switch (result.status) {
    case 200:
      break;
    case 401:
    case 403:
    case 404:
    default:
      this.error = result.status;
      this.isLoading = false;
      return;
  }

  try {
    result = await result.json();
  } catch (err) {
    this.error = err;
    this.isLoading = false;
    return;
  }

  this.error = null;
  this.data = result;
  this.isLoaded = true;
  this.publish();
  this.isLoading = false;
};

const publisherManager = {
  publishers: {},
  getPublisher(url) {
    if (!this.publishers[url]) {
      this.publishers[url] = new Publisher(url);
    }
    return this.publishers[url];
  },
};

const useSubscribeData = (url) => {
  const publisher = publisherManager.getPublisher(url);

  const [isLoaded, setIsLoaded] = useState(publisher.isLoaded);
  const [data, setData] = useState(publisher.data);

  useEffect(() => {
    setIsLoaded(publisher.isLoaded);

    const handleUpdateData = (currentData) => {
      setData(currentData);
      setIsLoaded(true);
    };

    publisher.subscribe(handleUpdateData);

    return () => {
      publisher.unsubscribe(handleUpdateData);
    };
  }, [url]);

  return [data, isLoaded];
};

const useFetchData = (url) => {
  const setError = useContext(ErrorContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      setIsLoaded(false);

      let result;

      try {
        result = await fetch(url);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err);
        return;
      }
      if (!isMounted) {
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
        if (!isMounted) {
          return;
        }

        setError(err);
        return;
      }
      if (!isMounted) {
        return;
      }

      setData(result);
      setIsLoaded(true);
    })();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return [data, isLoaded];
};

export { useFetchData, useSubscribeData };
