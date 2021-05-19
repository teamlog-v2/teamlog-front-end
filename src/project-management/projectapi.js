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
export const GetFollowProjects = async () => {
  const response = await fetch('/api/users/jduckling1024/project-follow', { // 아이디 변경 필요
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

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

// 프로젝트 초대 (아이디 변경 필요)
export const JoinProject = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/joins?userId=ondal1997`, {
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

// 프로젝트 초대 및 신청 수락
export const Accept = async (joinId) => {
  const response = await fetch(`/api/project-joins/${joinId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 멤버 신청 삭제
export const Refuse = async (joinId) => {
  const response = await fetch(`/api/project-joins/${joinId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 팔로우
export const Follow = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/followers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

// 프로젝트 언팔로우
export const UnFollow = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/followers`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
