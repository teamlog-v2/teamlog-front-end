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

function cmpTimeStr(a, b) {
  return new Date(b) - new Date(a);
}

//
// 최신, 인기?
export default function HomePage() {
  const [userId] = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [invitations, setInvitations] = useState(null);
  const [belongingProjects, setBelongingProjects] = useState(null);
  const [followingProjects, setFollowingProjects] = useState(null);
  const [followingUsersPosts, setFollowingUsersPosts] = useState(null);
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

    // 나의 팔로워의 게시물
    fetch('/api/following-users/posts')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFollowingUsersPosts(res);
      });
  }, []);

  useEffect(() => {
    if (!belongingProjects) {
      return;
    }

    // 테스크
    // 프로젝트 단위로 받는데,
    // 최신 (7일 이내? 기준시간값을 변경하기 쉽게 구현하세요)측에 속하는 것만 가지고 나머지는 날린다. (이러고 남은게 없으면 패스~)
    // 정렬 후 포장해서 저장한다.
    belongingProjects.forEach((project) => {
      fetch(`/api/projects/${project.id}/tasks`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // 최신 항목 분리 (7일 이내의 항목)
          const filteredTasks = res.filter((task) => {
            const deltaTime = Date.now() - new Date(task.updateTimeStr);
            return deltaTime <= 7 * 24 * 60 * 60 * 1000;
          });

          if (filteredTasks.length > 0) {
            filteredTasks.sort((a, b) => cmpTimeStr(a.updateTimeStr, b.updateTimeStr));
            const taskWrapper = {
              type: 'TASKS',
              tasks: filteredTasks,
              project,
              wrapperTime: filteredTasks[0].updateTime,
              wrapperTimeStr: filteredTasks[0].updateTimeStr,
            };
            setTaskWrappers((prev) => [...prev, taskWrapper]);
          }
          tasksCounter.current += 1;
        });
    });

    // 게시물
    // 프로젝트 단위로 받는데, 딱히 구분하진 않는다.
    // 상태변수에 추가한다. (정렬은 나중에 한번에)
    belongingProjects.forEach(({ id }) => {
      fetch(`/api/posts/project/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // TODO : 최신 항목 분리 (안해도될듯)
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
    // 상태변수에 추가한다. (정렬은 나중에 한번에)
    followingProjects.forEach(({ id }) => {
      fetch(`/api/posts/project/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // TODO : 최신 항목 분리 (안해도될듯)
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
      followingPostsCounter.current !== followingProjects.length ||
      followingUsersPosts === null
    ) {
      return;
    }

    // 중복 포스트를 날리고, Wrapping 하기
    const postWrappers = [];
    const checker = {};
    [...belongingPosts, ...followingPosts, ...followingUsersPosts].forEach((post) => {
      if (checker[post.id]) {
        return;
      }
      checker[post.id] = true;
      postWrappers.push({
        type: 'POST',
        post,
        project: post.project,
        wrapperTime: post.writeTime,
        wrapperTimeStr: post.writeTimeStr,
      });
    });

    // wrapper 통합 및 정렬
    const wrappers = [...taskWrappers, ...postWrappers];
    wrappers.sort((a, b) => cmpTimeStr(a.wrapperTimeStr, b.wrapperTimeStr));
    // 개수를 잘라낸다?? (일단은 ㅇㅇ!)
    if (wrappers.length > 20) {
      wrappers.length = 20;
    }

    setUnits(wrappers);
    setIsLoaded(true);
  }, [invitations, taskWrappers, belongingPosts, followingPosts, followingUsersPosts]);

  // == render ========
  if (!isLoaded) {
    return <h1>환영합니다, 최신 뉴스 피드를 준비하는 중입니다!</h1>;
  }

  return (
    <>
      <h1>최신 뉴스 피드(꾸미면 예뻐집니다(아마도))</h1>

      <Divider />
      {invitations.map((unit) => (
        <div key={unit.id}>{unit.projectName}에 초대되었습니다</div>
      ))}

      {units.map((wrapper) => {
        switch (wrapper.type) {
          case 'POST':
            return (
              <div key={`POST_${wrapper.post.id}`}>
                {wrapper.wrapperTime} 여기에 포스트
              </div>
            );
          case 'TASKS':
            return (
              <div key={`TASKS_${wrapper.project.id}`}>
                {wrapper.wrapperTime} 여기에 테스크스
              </div>
            );
          default:
            return null;
        }
      })}
      <div>뉴스는 여기까지</div>
      <Divider />
    </>
  );
}
