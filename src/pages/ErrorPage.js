import { Box, Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import icon from '../teamlogIcon.png';

const ErrorPage = ({ error }) => {
  const history = useHistory();

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img src={icon} alt="TeamLog" style={{ maxWidth: '16rem' }} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#F8F8F8"
        padding="2rem"
      >
        <Box fontSize="2rem" fontWeight="lighter" whiteSpace="pre">
          {`${error}`}
        </Box>
        <Box height="1rem" />
        <Button
          size="large"
          color="primary"
          variant="contained"
          disableElevation
          onClick={() => {
            history.push('/');
          }}
        >
          홈으로
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
