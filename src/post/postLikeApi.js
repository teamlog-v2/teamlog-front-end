export const GetLiker = async (postId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/posts/${postId}/likers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  ).then((res) => res.json());
  return response;
};

export const CreateLiker = async (postId) => {
  const status = await fetch(
    `${process.env.REACT_APP_API_URL}/api/posts/${postId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(liker),
  },
  ).then((res) => res.status);
  return status;
};

export const DeleteLiker = async (postId) => {
  const status = await fetch(
    `${process.env.REACT_APP_API_URL}/api/posts/${postId}/like`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  ).then((res) => res.status);
  return status;
};
