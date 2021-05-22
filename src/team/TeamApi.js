// 팔로우한 팀 조회
const GetFollowTeams = async (teamId) => {
    const response = await fetch(`/api/projects/${teamId}/followers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
};

// 팀 팔로워 조회
const GetTeamFollowers = () => {

};

// 팀 팔로우
const FollowTeam = () => {

};

// 팀 언팔로우
const UnFollowTeam = () => {

};
