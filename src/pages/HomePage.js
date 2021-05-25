import { Divider } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../contexts/auth';

// 1. 프로젝트 2. 게시물 (3. 댓글)
// 태스크
// 초대장, 팔로워

// 내가 속한 프로젝트의 (최신 태스크) 가능 fetch(`api/projects/{projectid}/tasks`); - 완료🔥
// (나에게로 온 초대장) 가능 fetch(`/api/users/project-invitation`); - 완료🔥
// (나의 새로운 팔로워) X: 팔로워리스트 받을때 팔로우한 시간도 받을수있어야함
// 내가 속한 프로젝트의 (새로운 게시물) 가능 fetch(`/api/projects/user/${userId}`); - 완료🔥
// 내가 팔로우하는 프로젝트의 (새로운 게시물) 가능 fetch(`/api/users/${userId}/following-projects`); - 완료🔥
// 내가 팔로우하는 사람이 작성한 (새로운 게시물) X: userId로 포스트 받아오는것 있어야함

//
// 지도로 탐험하기 버튼 -> MapPage로 이동

//
// 최신, 인기?
export default function HomePage() {
  const [userId] = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [invitations, setInvitations] = useState(null);
  const [belongingProjects, setBelongingProjects] = useState(null);
  const [followingProjects, setFollowingProjects] = useState(null);
  const [followingUsers, setFollowingUsers] = useState(null);
  const [taskWrappers, setTaskWrappers] = useState([]);
  const tasksCounter = useRef(0);
  const [belongingPosts, setBelongingPosts] = useState([]);
  const belongingPostsCounter = useRef(0);
  const [followingPosts, setFollowingPosts] = useState([]);
  const followingPostsCounter = useRef(0);

  // taskWrapper와 postWrapper들이 들어간다.
  const [units, setUnits] = useState(null);

  useEffect(() => {
    // 초대장
    fetch('/api/users/project-invitation')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setInvitations(res);
      });

    // 속한 프로젝트
    fetch(`/api/projects/user/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBelongingProjects(res);
      });

    // 팔로우 프로젝트
    fetch(`/api/users/${userId}/following-projects`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFollowingProjects(res);
      });

    // 나의 팔로워
    fetch(`/api/users/${userId}/following`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFollowingUsers(res);
      });
  }, []);

  useEffect(() => {
    if (!belongingProjects) {
      return;
    }

    // 테스크
    // 프로젝트 단위로 받는데,
    // 최신 (5일 이내? 기준시간값을 변경하기 쉽게 구현하세요)측에 속하는 것만 가지고 나머지는 날린다. (이러고 남은게 없으면 패스~)
    // 정렬 후 포장해서 저장한다. wrapper.isTask = true
    belongingProjects.forEach((project) => {
      fetch(`/api/projects/${project.id}/tasks`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const filteredTasks = res; // TODO: 최신 항목 분리

          if (filteredTasks.length > 0) {
            // TODO: 최신 순 정렬
            // filteredTasks.sort();
            // TODO: wrapperTime 변경
            const taskWrapper = {
              type: 'TASKS',
              tasks: filteredTasks,
              project,
              wrapperTime: filteredTasks[0].updateTime,
            };
            setTaskWrappers((prev) => [...prev, taskWrapper]);
          }
          tasksCounter.current += 1;
        });
    });

    // 게시물
    // 프로젝트 단위로 받는데, 딱히 구분하진 않는다.
    // 최신 측에 속하는 것만 가지고 나머지는 날린다.
    // 상태변수에 추가한다. (정렬은 나중에 한번에)
    belongingProjects.forEach(({ id }) => {
      fetch(`/api/posts/project/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // TODO : 최신 항목 분리
          setBelongingPosts((prev) => [...prev, ...res.content]);
          belongingPostsCounter.current += 1;
        });
    });
  }, [belongingProjects]);

  useEffect(() => {
    if (!followingProjects) {
      return;
    }

    // 게시물
    // 프로젝트 단위로 받는데, 딱히 구분하진 않는다.
    // 최신 측에 속하는 것만 가지고 나머지는 날린다.
    // 상태변수에 추가한다. (정렬은 나중에 한번에)
    followingProjects.forEach(({ id }) => {
      fetch(`/api/posts/project/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // TODO : 최신 항목 분리
          setFollowingPosts((prev) => [...prev, ...res.content]);
          followingPostsCounter.current += 1;
        });
    });
  }, [followingProjects]);

  useEffect(() => {
    if (
      invitations === null ||
      belongingProjects === null ||
      tasksCounter.current !== belongingProjects.length ||
      belongingPostsCounter.current !== belongingProjects.length ||
      followingProjects === null ||
      followingPostsCounter.current !== followingProjects.length
    ) {
      return;
    }

    console.log(invitations);
    console.log(taskWrappers);
    console.log(belongingPosts);
    console.log(followingPosts);

    // 중복 포스트를 날리고, Wrapping 하기
    const postWrappers = [];
    const checker = {};
    [...belongingPosts, ...followingPosts].forEach((post) => {
      if (checker[post.id]) {
        return;
      }
      checker[post.id] = true;
      postWrappers.push({
        type: 'POST',
        post,
        project: post.project,
        wrapperTime: post.writeTime,
      });
    });

    // wrapper 통합하기
    const wrappers = [...taskWrappers, ...postWrappers];
    // TODO: wrapperTime으로 wrappers를 정렬

    setUnits(wrappers);
    setIsLoaded(true);
  }, [invitations, taskWrappers, belongingPosts, followingPosts]);

  // == render ========
  if (!isLoaded) {
    return <h1>환영합니다, 최신 뉴스 피드를 준비하는 중입니다!</h1>;
  }

  return (
    <>
      <h1>최신 뉴스 피드</h1>

      <Divider />
      {invitations.map((unit) => (
        <div key={unit.id}>{unit.projectName}</div>
      ))}

      <Divider />
      {units.map((wrapper) => {
        switch (wrapper.type) {
          case 'POST':
            return <div key={`POST_${wrapper.post.id}`}>여기에 포스트</div>;
          case 'TASKS':
            return (
              <div key={`TASKS_${wrapper.project.id}`}>여기에 테스크스</div>
            );
          default:
            return null;
        }
      })}
      <Divider />
    </>
  );
}
