import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ error }) => {
  return (
    <>
      <h1>{`${error}`}</h1>
      <Link to="/">홈으로</Link>
    </>
  );
};

export default ErrorPage;
