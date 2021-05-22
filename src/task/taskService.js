const headersData = { 'Content-Type': 'application/json' };

const getTasksByProject = (projectId) => fetch(`/api/projects/${projectId}/tasks`, {
    method: 'Get',
    headers: headersData,
  });

const createTask = (projectId, data) => fetch(`/api/projects/${projectId}/tasks`, {
    method: 'Post',
    body: JSON.stringify(data),
    headers: headersData,
  });

const updateTaskStatus = (taskId, data) => fetch(`/api/tasks/${taskId}/location`, {
    method: 'Put',
    body: JSON.stringify(data),
    headers: headersData,
  });

export { getTasksByProject, createTask, updateTaskStatus };
