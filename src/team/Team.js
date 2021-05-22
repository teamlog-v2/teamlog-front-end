import { React, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import TeamHeader from './TeamHeader';
import TeamMain from './TeamMain';
import TeamProject from './TeamProject';
import TeamMember from './TeamMember';

export default function Team() {
  const sections = [
    { title: '홈', url: '', component: TeamMain },
    { title: '프로젝트', url: '/project', component: TeamProject },
    { title: '멤버', url: '/member', component: TeamMember },
  ];

  const [relation, setRelation] = useState(null);

  return (
    <>
      <TeamHeader sections={sections} updateRelation={setRelation} />

      <Switch>
        {sections.map((section, index) => (
          <Route
            key={index}
            exact
            path={`/teams/:id${section.url}`}
            component={() => (
              <section.component relation={relation} />
            )}
          />
        ))}
      </Switch>
    </>
  );
}
