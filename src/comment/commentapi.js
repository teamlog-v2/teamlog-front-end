export const CreateComment = (
  parentCommentIdVal,
  postIdVal,
  contentsVal,
  commentMentionsVal,
) => {
  const comment = {
    parentCommentId: parentCommentIdVal,
    writerId: null,
    postId: postIdVal,
    contents: contentsVal,
    commentMentions: commentMentionsVal,
  };

  const status = fetch('/api/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  }).then((res) => res.status);

  return status;
};

export const UpdateComment = async (
  parentCommentIdVal,
  postIdVal,
  contentsVal,
  commentMentionsVal,
) => {
  const comment = {
    parentCommentId: parentCommentIdVal,
    writerId: null,
    postId: postIdVal,
    contents: contentsVal,
    commentMentions: commentMentionsVal,
  };

  const status = await fetch(`/api/comments/${comment.parentCommentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  return status;
};

export const GetComment = async (postId, size) => {
  // size만 바뀌는 쪽으로 진행
  const response = await fetch(
    `/api/posts/${postId}/parent-comments?page=0&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json());

  return response;
};

export const GetChildComment = async (commentId, size) => {
  const response = await fetch(
    `/api/comments/${commentId}/child-comments?page=0&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json());
  return response;
};

export const DeleteComment = async (commentId) => {
  const status = await fetch(
    `/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.status);
  return status;
};
