// 팔로우한 팀 조회
export const GetFollowTeams = async (teamId) => {
    const response = await fetch(`/api/projects/${teamId}/followers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
};

// 팀 팔로워 조회
export const GetTeamFollowers = () => {

};

// 팀 팔로우
export const FollowTeam = () => {

};

// 팀 언팔로우
export const UnFollowTeam = () => {

};

// 팀 조회
export const GetTeam = (teamId) => {
    const response = fetch(`/api/teams/${teamId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return response;
};

// 팀 신청 유저 조회
export const GetTeamApplcants = (teamId) => {
    const response = fetch(`/api/teams/${teamId}/joins/apply`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return response;
};

// 팀 초대 받은 유저 조회
export const GetTeamInvitees = (teamId) => {
    const response = fetch(`/api/teams/${teamId}/joins/invitation`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return response;
};

// 팀 멤버 조회
export const GetTeamMembers = (teamId) => {
    const response = fetch(`/api/teams/${teamId}/members`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    return response;
};

export const AcceptTeam = (teamId) => {

};

export const RefuseTeam = (teamId) => {

};

export const DeleteTeam = (teamId) => {

};

export const KickOutTeamMember = (teamId) => {

};
