import { useEffect, useState } from 'react';

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
  } catch (e) {
    this.error = e;
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
  } catch (e) {
    this.error = e;
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
  const [isLoaded, setIsLoaded] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // getDerivedStateFromProps
  const [prevUrl, setPrevUrl] = useState(null);
  if (url !== prevUrl) {
    setPrevUrl(url);

    // state 합치는 것도 고민
    setIsLoaded(false);
    setData(null);
    setError(null);
  }

  useEffect(() => {
    let isMounted = true;

    (async () => {
      let response;
      let result;

      try {
        response = await fetch(url);
      } catch (e) {
        if (!isMounted) {
          return;
        }

        setError(e);
        return;
      }
      if (!isMounted) {
        return;
      }

      try {
        result = await response.json();
      } catch (e) {
        if (!isMounted) {
          return;
        }

        setError(e);
        return;
      }
      if (!isMounted) {
        return;
      }
      switch (response.status) {
        case 200:
          break;
        case 401:
        case 403:
        case 404:
        default:
          setError(result.message);
          return;
      }

      setData(result);
      setIsLoaded(true);
    })();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return [data, isLoaded, error];
};

export { useFetchData, useSubscribeData };
