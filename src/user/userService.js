const headersData = { 'Content-Type': 'application/json' };

const validateLogin = async () => fetch('/api/accounts/validate', {
  method: 'Get',
  headers: headersData,
});

const login = async (data) => fetch('/api/accounts/sign-in', {
  method: 'Post',
  body: JSON.stringify(data),
  headers: headersData,
});

const createUser = async (data) => fetch('/api/accounts', {
    method: 'Post',
    body: JSON.stringify(data),
    headers: headersData,
  });

const deleteUser = async () => fetch('/api/accounts', {
    method: 'Delete',
    headers: headersData,
  });

const getUser = async (id) => fetch(`/api/accounts/${id}`, {
    method: 'Get',
    headers: headersData,
  });

const updateUser = async (formData) => fetch('/api/accounts', {
    method: 'Put',
    body: formData,
    headers: {},
  });

const getUserFollower = async (id) => fetch(`/api/accounts/${id}/follower`, {
    method: 'Get',
    headers: headersData,
  });

const getUserFollowing = async (id) => fetch(`/api/accounts/${id}/following`, {
    method: 'Get',
    headers: headersData,
  });

const follow = async (id) => fetch(`/api/userfollows/${id}`, {
    method: 'Post',
    headers: headersData,
  });

const unfollow = async (id) => fetch(`/api/userfollows/${id}`, {
    method: 'Delete',
    headers: headersData,
  });

export { validateLogin, login, createUser, getUser, updateUser,
  getUserFollower, getUserFollowing, follow, unfollow, deleteUser };
