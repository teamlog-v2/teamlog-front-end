import { Avatar, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { convertResourceUrl } from '../utils';

const useStyles = makeStyles(() => ({
  user: {
    cursor: 'pointer',
  },
  image: {
    backgroundColor: 'black',
  },
  small: {
    width: '35px',
    height: '35px',
  },
}));

const UserImage = (props) => {
  const classes = useStyles();

  const { imgPath = '' } = props;

  return <Avatar className={classes.small} src={imgPath ? convertResourceUrl(imgPath) : ''} />;
};

const UserId = (props) => {
  const { userId, fontSize } = props;

  return (
    <Box display="inline-block" fontSize={fontSize}>
      <Link
        to={`/accounts/${userId}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <strong style={{ marginRight: '0.25em' }}>{userId}</strong>
      </Link>
    </Box>
  );
};

export { UserId, UserImage };

