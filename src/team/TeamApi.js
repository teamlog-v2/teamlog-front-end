import { GetProject, GetProjectMembers } from '../project-management/projectapi';

// 유저 팀 리스트 조회
export const GetUserTeams = async (userId) => {
  const response = await fetch(`/api/teams/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
};

// 팔로우한 팀 조회
export const GetFollowTeams = async (userId) => {
    const response = await fetch(`/api/accounts/${userId}/team-follow`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
};

// 팀 팔로워 조회
export const GetTeamFollowers = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}/followers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 팔로우
export const FollowTeam = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}/followers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 언팔로우
export const UnFollowTeam = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}/followers`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 조회
export const GetTeam = async (teamId) => {
    const response = await fetch(`/api/teams/${teamId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return response;
};

// 팀 신청 유저 조회
export const GetTeamApplcants = async (teamId) => {
    const response = await fetch(`/api/teams/${teamId}/joins/apply`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return response;
};

// 팀 신청 유저 조회
export const GetAppliedTeams = async (teamId) => {
  const response = await fetch('/api/accounts/team-apply', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  });

  return response;
};

// 팀 초대 받은 유저 조회
export const GetTeamInvitees = async (teamId) => {
    const response = await fetch(`/api/teams/${teamId}/joins/invitation`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return response;
};

// 유저가 받은 팀 초대 조회
export const GetInvitedTeams = async (teamId) => {
  const response = await fetch('/api/accounts/team-invitation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  });

  return response;
};

// 팀 멤버 조회
export const GetTeamMembers = async (teamId) => {
    const response = await fetch(`/api/teams/${teamId}/members`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return response;
};

// 팀 내 프로젝트 조회
export const GetTeamProjects = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 초대 및 신청 수락
export const AcceptTeam = async (joinId) => {
  const response = await fetch(`/api/team-joins/${joinId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 신청 수락
export const InvitationAccept = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 초대 거절
export const RefuseTeam = async (joinId) => {
  const response = await fetch(`/api/team-joins/${joinId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 삭제
export const DeleteTeam = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 탈퇴
export const LeaveTeam = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}/members`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 멤버 추방
export const KickOutTeamMember = async (teamId, memberId) => {
  const response = await fetch(`/api/teams/${teamId}/members?userId=${memberId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 마스터 위임
export const DelegateTeamMaster = async (teamId, masterId) => {
    console.log(masterId);
    const response = await fetch(`/api/teams/${teamId}/master?new-master=${masterId}`, { // 아이디 변경 필요
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
};

// 팀 초대
export const JoinTeam = async (teamId, userId) => {
    const response = await fetch(`/api/teams/${teamId}/joins?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return response;
};

// 팀 가입
export const ApplyTeam = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}/joins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
  });

  return response;
};

// 팀 가입 취소
export const CancelApplyTeam = async (joinId, memberId) => {
  const response = await fetch(`/api/team-joins/${joinId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 팀 프로젝트 생성 알림
export const CreateTeamProjectNotification = async (userId, teamId, projectId, projectName) => {
  const res = await fetch('/pusher/push-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectName,
      teamId,
      projectId,
      source: userId,
      type: 'create_team_project',
    }),
  });

  console.log(res);
};

// 팀 팔로우 알림
export const FollowTeamNotification = async (teamId, userId) => {
  console.log(userId);
  const res = await fetch('/pusher/push-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      teamId,
      source: userId,
      type: 'follow_team',
    }),
});

console.log(res);
};

// 팀 초대 알림
export const InviteTeamNotification = async (teamId, userId, invitees) => {
  console.log(invitees);
  const res = await fetch('/pusher/push-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      teamId,
      targets: invitees,
      source: userId,
      type: 'invite_team',
    }),
});

console.log(res);
};

// 팀 마스터 위임 알림
export const DelegateTeamMasterNotification = async (teamId, masterId, newMasterId) => {
  console.log(`${teamId} ${masterId} ${newMasterId}`);
  const res = await fetch('/pusher/push-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      teamId,
      target: newMasterId,
      source: masterId,
      type: 'delegate_team_master',
    }),
});

console.log(res);
};
