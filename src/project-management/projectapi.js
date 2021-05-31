// 프로젝트 조회
export const GetProject = async (projectId) => {
  const response = fetch(`/api/projects/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 내 팀 설정
export const SetProjectTeam = async (projectId, teamIdVal) => {
  const data = {
    teamId: teamIdVal,
  };
  const response = await fetch(`/api/projects/${projectId}/team`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
};

// 프로젝트 삭제
export const DeleteProject = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 멤버 조회
export const GetProjectMembers = async (projectId) => {
    let response = [];
    response = await fetch(`/api/projects/${projectId}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
};

// 프로젝트 팔로워 조회
export const GetProjectFollowers = async (projectId) => {
    const response = await fetch(`/api/projects/${projectId}/followers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
};

// 유저가 팔로우하는 프로젝트 목록 조회
export const GetFollowProjects = async (userId) => {
  const response = await fetch(`/api/users/${userId}/project-follow`, { // 아이디 변경 필요
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 마스터 위임
export const DelegateProjectMaster = async (projectId, masterId) => {
  console.log(masterId);
  const response = await fetch(`/api/projects/${projectId}/master?new-master=${masterId}`, { // 아이디 변경 필요
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response);
  return response;
};

// 프로젝트 신청자 목록 조회
export const GetProjectApplcants = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/joins/apply`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 멤버로 초대한 사용자 목록
export const GetProjectInvitees = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/joins/invitation`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 초대
export const JoinProject = async (projectId, userId) => {
  const response = await fetch(`/api/projects/${projectId}/joins?userId=${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 가입 신청
export const ApplyProject = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/joins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 신청 수락
export const AcceptProject = async (joinId) => {
  const response = await fetch(`/api/project-joins/${joinId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 초대 수락
export const InvitationAccept = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 멤버 신청 삭제
export const RefuseProject = async (joinId) => {
  const response = await fetch(`/api/project-joins/${joinId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 멤버 추방
export const KickOutProjectMember = async (projectId, memberId) => {
  const response = await fetch(`/api/projects/${projectId}/members?userId=${memberId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 탈퇴
export const LeaveProject = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/members`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 팔로우
export const FollowProject = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/followers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 언팔로우
export const UnFollowProject = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/followers`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 유저 프로젝트 리스트 조회
export const GetUserProjects = async (userId) => {
  const response = await fetch(`/api/projects/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 유저가 초대받은 프로젝트 조회
export const GetInvitedProjects = async () => {
  const response = await fetch('/api/users/project-invitation', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 유저가 가입 신청한 프로젝트 조회
export const GetAppliedProjects = async () => {
  const response = await fetch('/api/users/project-apply', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 팔로우 알림
export const FollowProjectNotification = async (projectId, userId) => {
  const objective = await GetProject(projectId).then((res) => res.json()).then((res) => res.name);
  const target = await GetProjectMembers(projectId).then((res) => res.json());

  const res = await fetch('/pusher/push-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      target,
      objective,
      source: userId,
      type: 'follow_project',
    }),
});

console.log(res);
};

// 프로젝트 초대 알림
export const InviteProjectNotification = async (projectId, userId, invitees) => {
  console.log(invitees);
  const res = await fetch('/pusher/push-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      targets: invitees,
      source: userId,
      type: 'invite_project',
    }),
});

console.log(res);
};

// 프로젝트 마스터 위임 알림
export const DelegateProjectMasterNotification = async (projectId, masterId, newMasterId) => {
  const res = await fetch('/pusher/push-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      target: newMasterId,
      source: masterId,
      type: 'delegate_team_master',
    }),
  });
};
