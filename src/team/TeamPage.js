import { Button } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { useFetchData } from '../hooks/hooks';

export default function TeamPage() {
  const { id } = useParams();

  const [team, isTeamLoaded] = useFetchData(`/api/teams/${id}`);

  if (!isTeamLoaded) {
    return null;
  }

  // render ========
  const { name, introduction, masterId, memberCount, accessModifier } = team;
  return (
    <>
      <h1>{name}</h1>
      <h2>{introduction}</h2>

      <h3>팀 생성일</h3>
      <h3>마스터: {masterId}</h3>
      <h3>멤버 수: {memberCount}</h3>
      <h3>{accessModifier}</h3>

      <Button>팀 설정 (마스터인 경우)</Button>
      <Button>팀 멤버 조회</Button>
      <Button>팀 프로젝트 조회</Button>
    </>
  );
}
