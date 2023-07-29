import React from 'react';
import { Avatar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

// const UserInfo = (props) => {
//   const classes = useStyles();
//   const { userId, imgWidth, imgHeight, imgPath, fontSize } = props;
//   return (
//     <Grid container className={classes.user} alignItems="center">
//       <UserImage imgWidth={imgWidth} imgHeight={imgHeight} imgPath={imgPath} />
//       <UserId userId={userId} fontSize={fontSize} />
//     </Grid>
//   );
// };

export { UserImage, UserId };
