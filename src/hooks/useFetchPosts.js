import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const defaultState = {
  isLoading: false,
  posts: [],
  error: null,
};

const useFetchPosts = (url) => {
  // '비동기 컴포넌트 상태 변경' 제어를 위한 변수
  const isMounted = useRef(true);
  const promiseRef = useRef(null);

  const [state, setState] = useState(defaultState);
  const [totalCount, setTotalCount] = useState(null);

  // TODO: useCallback 사용 고려하기
  const fetchPosts = (init = false) => {
    const posts = init ? [] : state.posts;

    setState({
      isLoading: true,
      posts,
      error: null,
    });

    (async () => {
      let result;
      let promise;
      try {
        const query = posts.length
          ? `&cursor=${posts[posts.length - 1].id}`
          : '';
        promise = fetch(`${url}${query}&size=3`);

        promiseRef.current = promise;
        const res = await promise;
        if (promiseRef.current !== promise || !isMounted) {
          return;
        }
        if (res.status !== 200) {
          throw res.status;
        }

        // 테스트를 위한 딜레이
        // promise = new Promise((resolve) => {
        //   setTimeout(resolve, 200);
        // });
        // promiseRef.current = promise;
        // await promise;
        // if (promiseRef.current !== promise || !isMounted) {
        //   return;
        // }

        promise = res.json();
        promiseRef.current = promise;
        result = await promise;
        if (promiseRef.current !== promise || !isMounted) {
          return;
        }
      } catch (error) {
        setState({
          isLoading: false,
          posts,
          error,
        });
        return;
      }
      setTotalCount(result.totalElements);
      console.log('post 로드');
      setState({
        isLoading: false,
        posts: [...posts, ...result.content],
        error: null,
      });
    })();
  };

  const initPosts = () => {
    const posts = [];

    (async () => {
      let result;
      let promise;
      try {
        const query = posts.length
          ? `&cursor=${posts[posts.length - 1].id}`
          : '';
        promise = fetch(`${url}${query}&size=3`);

        promiseRef.current = promise;
        const res = await promise;
        if (promiseRef.current !== promise || !isMounted) {
          return;
        }
        if (res.status !== 200) {
          throw res.status;
        }

        promise = res.json();
        promiseRef.current = promise;
        result = await promise;
        if (promiseRef.current !== promise || !isMounted) {
          return;
        }
      } catch (error) {
        setState({
          isLoading: false,
          posts,
          error,
        });
        return;
      }
      setTotalCount(result.totalElements);
      setState({
        isLoading: false,
        posts: [...posts, ...result.content],
        error: null,
      });
    })();
  };

  useLayoutEffect(() => {
    fetchPosts(true);
  }, [url]);

  const updatePost = (postId, post) => {
    let updatedIndex = -1;
    [...state.posts].some(({ id }, index) => {
      updatedIndex = index;
      return (postId === id);
    });
    const updatedPosts = [...state.posts];
    updatedPosts[updatedIndex] = post;
    setState({ ...state, posts: updatedPosts });
  };

  useEffect(() => () => {
      isMounted.current = false;
    });

  return { ...state, updatePost, fetchPosts, totalCount, initPosts };
};

export default useFetchPosts;
