export const getProjectMembers = async (projectId) => {
  let response = [];
  response = await fetch(
    `/api/projects/${projectId}/members`,
  ).then((res) => res.json());
  return response;
};

export const getProject = async (projectId) => {
  alert(projectId);
};
