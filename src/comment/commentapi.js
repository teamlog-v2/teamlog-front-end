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
    console.log(res.status);
  });
};

export const GetComment = async (postId, page, size) => {
  console.log(page, size);
  const response = await fetch(
  //   `/api/posts/${postId}/parent-comments?page=${page}&size=${size}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // ).then((res) => res.json());
  // return response;
  `/api/posts/${postId}/parent-comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
).then((res) => res.json());
return response;
};

export const GetChildComment = async (commentId) => {
  const response = await fetch(
    `/api/comments/${commentId}/child-comments`, {
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
