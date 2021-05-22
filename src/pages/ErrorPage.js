import { Box, Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const ErrorPage = ({ error }) => {
  const history = useHistory();

  return (
    <Box textAlign="center" margin="8rem 0">
      <Typography variant="h1">{`${error}`}</Typography>
      <Box height="1rem" />
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          history.push('/');
        }}
      >
        홈으로
      </Button>
    </Box>
  );
};

export default ErrorPage;
