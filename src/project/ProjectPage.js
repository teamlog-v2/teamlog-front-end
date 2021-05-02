import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { useFetchData } from '../hooks';

// 프로젝트 페이지 헤더
const ProjectPageHeader = () => {
  const match = useRouteMatch();
  const { projectId } = match.params;

  const [project, isProjectLoaded] = useFetchData(`/api/projects/${projectId}`);

  if (!isProjectLoaded) {
    return '프로젝트 헤더 로딩...';
  }

  return (
    <>
      <h1>{project.name}</h1>
      <h2>{project.introduction}</h2>
      <ul>
        <li>
          <Link to={`${match.url}`}>홈</Link>
        </li>
        <li>
          <Link to={`${match.url}/posts`}>포스트</Link>
        </li>
        <li>
          <Link to={`${match.url}/tasks`}>태스크</Link>
        </li>
      </ul>
    </>
  );
};

// 프로젝트 홈 페이지
const ProjectHomePage = () => {
  return 'Home';
};

// 프로젝트 포스트 페이지
const ProjectPostsPage = () => {
  const match = useRouteMatch();
  const { projectId } = match.params;

  const [posts, isPostsLoaded] = useFetchData(`/api/posts/project/${projectId}`);

  if (!isPostsLoaded) {
    return '프로젝트 포스트 로딩...';
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.writeTime}</h3>
          <div>{post.contents}</div>
        </div>
      ))}
    </>
  );
};

// 프로젝트 태스크 페이지
const ProjectTasksPage = () => {
  return 'Tasks';
};

// 프로젝트 페이지 (라우터)
const ProjectPage = () => {
  const match = useRouteMatch();

  return (
    <>
      <ProjectPageHeader />
      <hr />
      <Route exact path={`${match.path}`} component={ProjectHomePage} />
      <Route exact path={`${match.path}/posts`} component={ProjectPostsPage} />
      <Route exact path={`${match.path}/tasks`} component={ProjectTasksPage} />
    </>
  );
};

export default ProjectPage;
