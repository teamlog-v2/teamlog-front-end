import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectManagementPage from '../pages/ProjectManagementPage';
import TaskContainer from '../task/TaskContainer';
import MemberTab from './MemberTab';
import Header from './header';
import PostMain from './postmain';
import ProjectFollower from './projectfollower';
import ProjectMain from './projectmain';

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
