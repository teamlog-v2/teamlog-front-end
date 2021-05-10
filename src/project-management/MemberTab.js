import React, { useContext } from 'react';
import { useParams } from 'react-router';
import ErrorContext from '../contexts/error';
import { useFetchData } from '../hooks/hooks';

export default function MemberTab() {
  const { id: projectId } = useParams();

  const [members, isMemebersLoaded, membersLoadError] = useFetchData(
    `/api/projects/${projectId}/members`,
  );

  const { useHandleError } = useContext(ErrorContext);
  useHandleError(membersLoadError);

  if (!isMemebersLoaded) {
    return 'Loading...';
  }

  return (
    <>
      {members.map((member) => (
        <div key={member.id}>{member.id}</div>
      ))}
    </>
  );
}
