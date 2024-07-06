import { GetProject, GetProjectMembers } from '../project-management/project-api';

const headersData = { 'Content-Type': 'application/json' };

const getTasksByProject = (projectId) => fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}/tasks`, {
  method: 'Get',
  headers: headersData,
});

const createTask = (projectId, data) => fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}/tasks`, {
  method: 'Post',
  body: JSON.stringify(data),
  headers: headersData,
});

const updateTaskStatus = (taskId, data) => fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/location`, {
  method: 'Put',
  body: JSON.stringify(data),
  headers: headersData,
});

const putTask = (taskId, data) => fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`, {
  method: 'Put',
  body: JSON.stringify(data),
  headers: headersData,
});

const deleteTask = (taskId) => fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`, {
  method: 'Delete',
  headers: headersData,
});

// 태스크 생성 알림
const CreateTaskNotification = async (accountId, projectId) => {
  const objective = await GetProject(projectId).then((res) => res.json()).then((res) => res.name);
  const target = await GetProjectMembers(projectId).then((res) => res.json());

  const res = await fetch('/pusher/push-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      target,
      objective,
      source: accountId,
      type: 'create_task',
    }),
  });

  console.log(res);
};

export {
  CreateTaskNotification, createTask, deleteTask, getTasksByProject, putTask, updateTaskStatus
};

