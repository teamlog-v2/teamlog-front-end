const headersData = { 'Content-Type': 'application/json' };

const getTasksByProject = () => fetch('/api/projects/1/tasks', {
    method: 'Get',
    headers: headersData
  });

const createTask = (data) => fetch('/api/projects/1/tasks/hamchu', {
    method: 'Post',
    body: JSON.stringify(data),
    headers: headersData
});

const updateTaskStatus = (taskId, data) => fetch(`/api/tasks/${taskId}`, {
    method: 'Put',
    body: JSON.stringify(data),
    headers: headersData
});

export {
    getTasksByProject,
    createTask,
    updateTaskStatus
};