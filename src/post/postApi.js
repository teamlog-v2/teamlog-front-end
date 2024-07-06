
export const DeletePost = async (id) => {
  const status = await fetch(
    `${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  ).then((res) => res.status);
  return status;
};

// 게시물 수정 알림
export const UpdatePostNotification = async (accountId, projectId, postId) => {
  const project = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`)
    .then((res) => res.json());

  console.log(project);

  const res = await fetch('/pusher/push-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      project,
      postId,
      source: accountId,
      type: 'update_post',
    }),
  });
};
