const headersData = { 'Content-Type': 'application/json' };

const createUser = (data) => fetch('/api/users', {
    method: 'Post',
    body: JSON.stringify(data),
    headers: headersData,
  });

const getUser = (id) => fetch(`/api/users/${id}`, {
    method: 'Get',
    headers: headersData,
  });

export { createUser, getUser };
