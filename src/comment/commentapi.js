export const CreateComment = async (
  parentCommentIdVal,
  postIdVal,
  contentsVal,
  commentMentionsVal,
) => {
  const comment = {
    parentCommentId: parentCommentIdVal,
    writerId: null, // 이미 알고있어야 하는 아이디
    postId: postIdVal,
    contents: contentsVal,
    commentMentions: commentMentionsVal, // 여기에 이제 해시태그...
  };

  await fetch('/api/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  }).then((res) => {
    if (res !== 201) {
      console.log('error');
    }
  });
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
    ).then((res) => {
      if (res.status === 200) {
      return true;
    }
      return false;
    }); // 예외처리를 위한 틀
    return status;
};
