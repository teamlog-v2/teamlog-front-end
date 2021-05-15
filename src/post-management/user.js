import React from 'react';
import { Avatar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    margin: '3px',
  },
}));

const UserImage = (props) => {
  const classes = useStyles();

  const { imgPath } = props;

  return <Avatar className={classes.small} src={imgPath} />;
};

const UserId = (props) => {
  const { userId, fontSize } = props;

  return (
    <Box display="inline-block" fontSize={fontSize}>
      <span style={{ fontWeight: 600 }}>{userId}</span>
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
