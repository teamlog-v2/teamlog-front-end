const headersData = { 'Content-Type': 'application/json' };

const validateLogin = async () => fetch(`${process.env.REACT_APP_API_URL}/api/accounts/validate`, {
  method: 'Get',
  headers: headersData,
});

const login = async (data) => fetch(`${process.env.REACT_APP_API_URL}/api/accounts/sign-in`, {
  method: 'Post',
  body: JSON.stringify(data),
  headers: headersData,
});

const createAccount = async (data) => fetch(`${process.env.REACT_APP_API_URL}/api/accounts/sign-up`, {
  method: 'Post',
  body: JSON.stringify(data),
  headers: headersData,
});

const deleteAccount = async () => fetch(`${process.env.REACT_APP_API_URL}/api/accounts`, {
  method: 'Delete',
  headers: headersData,
});

const getAccount = async (id) => fetch(`${process.env.REACT_APP_API_URL}/api/accounts/${id}`, {
  method: 'Get',
  headers: headersData,
});

const updateAccount = async (formData) => fetch(`${process.env.REACT_APP_API_URL}/api/accounts`, {
  method: 'Put',
  body: formData,
  headers: {},
});

const getAccountFollower = async (id) => fetch(`${process.env.REACT_APP_API_URL}/api/accounts/${id}/follower`, {
  method: 'Get',
  headers: headersData,
});

const getAccountFollowing = async (id) => fetch(`${process.env.REACT_APP_API_URL}/api/accounts/${id}/following`, {
  method: 'Get',
  headers: headersData,
});

const follow = async (id) => fetch(`${process.env.REACT_APP_API_URL}/api/accountfollows/${id}`, {
  method: 'Post',
  headers: headersData,
});

const unfollow = async (id) => fetch(`${process.env.REACT_APP_API_URL}/api/accountfollows/${id}`, {
  method: 'Delete',
  headers: headersData,
});

export { createAccount, deleteAccount, follow, getAccount, getAccountFollower, getAccountFollowing, login, unfollow, updateAccount, validateLogin };

