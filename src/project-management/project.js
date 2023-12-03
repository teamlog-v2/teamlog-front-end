import { React, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './header';
import ProjectMain from './ProjectMain';
import PostMain from './postmain';
import MemberTab from './MemberTab';
import TaskContainer from '../task/TaskContainer';
import ProjectFollower from './ProjectFollower';
import ProjectManagementPage from '../pages/ProjectManagementPage';

export default function Project() {
  const sections = [
    { title: '홈', url: '', component: ProjectMain },
    { title: '포스트', url: '/post', component: PostMain },
    { title: '태스크', url: '/task', component: TaskContainer },
    { title: '멤버', url: '/member', component: MemberTab },
    { title: '팔로워', url: '/follower', component: ProjectFollower },
  ];

  const [relation, setRelation] = useState(null);

  return (
    <>
      <Header sections={sections} updateRelation={setRelation} />

      <Switch>
        {sections.map((section, index) => (
          <Route
            key={index}
            exact
            path={`/projects/:id${section.url}`}
            component={() => (
              <section.component relation={relation} />
            )}
          />
        ))}
        <Route
          path="/projects/:id/projectmanagement"
          component={() => <ProjectManagementPage relation={relation} />}
        />
      </Switch>
    </>
  );
}
