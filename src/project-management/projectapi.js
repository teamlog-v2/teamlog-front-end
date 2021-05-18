export const GetProjectMembers = async (projectId) => {
    let response = [];
    response = await fetch(`/api/projects/${projectId}/members`)
      .then((res) => res.json());
    return response;
};

export const GetProjectFollowers = async (projectId) => {
    const response = await fetch(`/api/projects/${projectId}/followers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
};

export const GetFollowProjects = async () => {
  const response = await fetch('/api/users/jduckling1024/project-follow', { // 아이디 변경 필요
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const Follow = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/followers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const UnFollow = async (projectId) => {
  const response = await fetch(`/api/projects/${projectId}/followers`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
