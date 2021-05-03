import { useContext, useEffect, useState } from 'react';
import ErrorContext from '../context/error';

const useProject = (projectId) => {
  const setError = useContext(ErrorContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoaded(false);

      let result;

      try {
        result = await fetch(`/api/projects/${projectId}`);
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

      setProject(result);
      setIsLoaded(true);
    })();
  }, [projectId]);

  return [project, isLoaded];
};

const useProjectPosts = (projectId) => {
  const setError = useContext(ErrorContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoaded(false);

      let result;

      try {
        result = await fetch(`/api/posts/project/${projectId}`);
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

      setPosts(result);
      setIsLoaded(true);
    })();
  }, [projectId]);

  return [posts, isLoaded];
};

export { useProject, useProjectPosts };
