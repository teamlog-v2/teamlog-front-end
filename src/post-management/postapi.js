export const UpdatePost = async () => {
    console.log('hi');
};

export const DeletePost = async (id) => {
    const status = await fetch(
        `/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then((res) => res.status);
      return status;
};
