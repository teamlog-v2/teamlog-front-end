const headersData = { 'Content-Type': 'application/json' };

const createUser = (data) => fetch('/api/users', {
    method: 'Post',
    body: JSON.stringify(data),
    headers: headersData
});

export {
    createUser
};