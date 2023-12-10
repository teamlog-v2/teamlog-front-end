export const CreateComment = async (
  parentCommentIdVal,
  postIdVal,
  contentsVal,
  commentMentionsVal,
) => {
  const comment = {
    parentCommentId: parentCommentIdVal,
    postId: postIdVal,
    contents: contentsVal,
    commentMentions: commentMentionsVal,
  };

  const status = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  }).then(async (res) => res.status);

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
  }).then((res) => res.status);

  return status;
};

export const GetComment = async (postId, page, size) => {
  const response = await fetch(
    `/api/posts/${postId}/parent-comments?page=${page}&size=${size}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  ).then((res) => res.json());

  return response;
};

export const GetChildComment = async (commentId, page, size) => {
  const response = await fetch(
    `/api/comments/${commentId}/child-comments?page=${page}&size=${size}`, {
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
