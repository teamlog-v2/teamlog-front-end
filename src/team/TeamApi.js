// 팔로우한 팀 조회
export const GetFollowTeams = async (userId) => {
    const response = await fetch(`/api/users/${userId}/team-follow`, {
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

export const GetTeamProjects = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const AcceptTeam = async (teamId) => {

};

export const RefuseTeam = async (joinId) => {
  const response = await fetch(`/api/team-joins/${joinId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response);
  return response;
};

export const DeleteTeam = async (teamId) => {
  const response = await fetch(`/api/teams/${teamId}`, {
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

  console.log(response.status);
  return response;
};

// 마스터 위임
export const DelegateTeamMaster = async (projectId, masterId) => {
    console.log(masterId);
    const response = await fetch(`/api/teams/${projectId}/master?new-master=${masterId}`, { // 아이디 변경 필요
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
