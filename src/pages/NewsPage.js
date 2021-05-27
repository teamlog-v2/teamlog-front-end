import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Reply } from '@material-ui/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import { DateInfo } from '../post-management/datetime';
import { CompressedPost } from '../post-management/post';

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
export default function NewsPage() {
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
            filteredTasks.sort((a, b) => {
              return cmpTimeStr(a.updateTimeStr, b.updateTimeStr);
            });
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

          // if (res.length > 0) {
          //   const curTaskWrappers = [];
          //   res.forEach((task) => {
          //     curTaskWrappers.push({
          //       type: 'TASKS',
          //       tasks: [task],
          //       project,
          //       wrapperTime: task.updateTime,
          //       wrapperTimeStr: task.updateTimeStr,
          //     });
          //   });
          //   setTaskWrappers((prev) => [...prev, ...curTaskWrappers]);
          // }
          // tasksCounter.current += 1;
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
    console.log(invitations === null);
    console.log(belongingProjects === null);
    console.log(tasksCounter.current !== belongingProjects?.length);
    console.log(belongingPostsCounter.current !== belongingProjects?.length);
    console.log(followingProjects === null);
    console.log(followingPostsCounter.current !== followingProjects?.length);
    console.log(followingUsersPosts === null);
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
    [...belongingPosts, ...followingPosts, ...followingUsersPosts].forEach(
      (post) => {
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
      },
    );

    // wrapper 통합 및 정렬
    const wrappers = [...taskWrappers, ...postWrappers];
    wrappers.sort((a, b) => cmpTimeStr(a.wrapperTimeStr, b.wrapperTimeStr));
    // 개수를 잘라낸다?? (일단은 ㅇㅇ!)
    if (wrappers.length > 20) {
      wrappers.length = 20;
    }

    setUnits(wrappers);
    setIsLoaded(true);
    console.log(invitations);
  }, [
    invitations,
    belongingProjects,
    followingProjects,
    taskWrappers,
    belongingPosts,
    followingPosts,
    followingUsersPosts,
  ]);

  // == render ========
  if (!isLoaded) {
    return (
      <Template bgcolor="#F8F8F8">
        <Box display="flex" alignItems="center">
          <CircularProgress />
          <Box width="1rem" />
          <Typography>최근 소식을 가져오고 있습니다...</Typography>
        </Box>
      </Template>
    );
  }

  return (
    <Template bgcolor="#F8F8F8">
      {invitations.length === 0 && units.length === 0 ? (
        <>
          <Typography variant="h3" color="primary">
            😅 최근 소식이 없네요...
          </Typography>
          <Box height="1rem" />
          <Divider />
          <Box height="1rem" />
          <Typography variant="body1" align="center">
            프로젝트에 참여해서 여정을 기록해보세요!
          </Typography>
          <Box height="1rem" />
        </>
      ) : (
        <>
          <Typography variant="h3" color="primary">
            🥳 최근 소식
          </Typography>
          <Box height="1rem" />
          <Divider />
          <Box height="1rem" />
        </>
      )}

      {invitations.map((invitation) => (
        <InvitationsCard key={invitation.id} invitation={invitation} />
      ))}

      {units.map((wrapper) => {
        switch (wrapper.type) {
          case 'POST':
            return (
              <PostCard key={`POST_${wrapper.post.id}`} postWrapper={wrapper} />
            );
          case 'TASKS':
            return (
              <TasksCard
                key={`TASKS_${wrapper.project.id}`}
                tasksWrapper={wrapper}
              />
            );
          default:
            return null;
        }
      })}
      <Divider />
    </Template>
  );
}

// == 이하 중요하지 않음 ========
function InvitationsCard({ invitation }) {
  const { projectId, projectName } = invitation;
  const history = useHistory();

  return (
    <UnitCard>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="caption" color="textSecondary">
            프로젝트 초대
          </Typography>
          <Typography variant="body1">
            <CustomLink to={`/projects/${projectId}`}>{projectName}</CustomLink>
            에 초대되었습니다.
          </Typography>
        </Box>
        <IconButton
          onClick={() => {
            history.push(`/projects/${projectId}`);
          }}
        >
          <Reply />
        </IconButton>
      </Box>
    </UnitCard>
  );
}

function TasksCard({ tasksWrapper }) {
  const { project, wrapperTime, tasks } = tasksWrapper;
  const mainTask = tasks[0]; // { status, updateTime, ... }
  const history = useHistory();

  return (
    <UnitCard>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="" color="primary">
            <CustomLink to={`/projects/${project.id}`}>
              {project.name}
            </CustomLink>
          </Typography>
          &nbsp;
          <DateInfo dateTime={wrapperTime} />
          <Box height="1rem" />
          <Box display="flex" alignItems="center">
            <CustomLink to={`/projects/${project.id}/task`}>
              <SmallCard>
                <span
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '0.25rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <CustomEm>
                    {(() => {
                      switch (mainTask.status) {
                        case 0:
                          return '진행 전';
                        case 1:
                          return '진행 중';
                        case 2:
                          return '완료';
                        case 3:
                          return '실패';
                        default:
                          return null;
                      }
                    })()}
                  </CustomEm>
                </span>
                &nbsp;{mainTask.taskName}
              </SmallCard>
            </CustomLink>
            <Box marginLeft="0.25rem">
              <CustomLink to={`/projects/${project.id}/task`}>
                <CustomEm>등 {tasks.length}건의 태스크</CustomEm>
              </CustomLink>
              가 업데이트 되었습니다.
            </Box>
          </Box>
        </Box>
        <IconButton
          onClick={() => {
            history.push(`/projects/${project.id}/task`);
          }}
        >
          <Reply />
        </IconButton>
      </Box>
    </UnitCard>
  );
}

function PostCard({ postWrapper }) {
  const { project, wrapperTime, post } = postWrapper;
  const history = useHistory();

  return (
    <UnitCard>
      <Typography variant="" color="primary">
        <CustomLink to={`/projects/${project.id}`}>{project.name}</CustomLink>
      </Typography>
      &nbsp;
      <DateInfo dateTime={wrapperTime} />
      <Box height="1rem" />
      <CompressedPost post={post} noTime />
    </UnitCard>
  );
}

function UnitCard({ children }) {
  return (
    <>
      <Card>
        <Box padding="1rem">{children}</Box>
      </Card>
      <Box marginBottom="1rem" />
    </>
  );
}

function SmallCard({ children }) {
  return (
    <Box
      bgcolor="#593875"
      color="white"
      padding="0.5rem"
      borderRadius="1rem"
      lineHeight="1.75rem"
    >
      {children}
    </Box>
  );
}

// //////////////////
function Template({ children, ...props }) {
  return (
    <>
      <Box maxWidth="768px" margin="2rem auto" {...props}>
        <Box padding="1rem">{children}</Box>
      </Box>
      <Box height="6rem" />
    </>
  );
}

function CustomLink({ children, ...props }) {
  return (
    <Link style={{ color: '#593875', textDecoration: 'none' }} {...props}>
      {children}
    </Link>
  );
}

function CustomEm({ children }) {
  return <strong style={{ color: '#593875' }}>{children}</strong>;
}
