export const getProjectMembers = async (projectId) => {
  let response = [];
  response = await fetch(
    `http://3.15.16.150:8090/api/projects/${projectId}/members`,
  ).then((res) => res.json());
  return response;
};

export const getProject = async (projectId) => {
  alert(projectId);
};
