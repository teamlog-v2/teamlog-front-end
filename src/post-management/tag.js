import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  tag: {
    margin: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: '10%',
    backgroundColor: 'rgb(195, 0, 255)',
    color: 'white',
    cursor: 'pointer',
  },
  userTag: {
    margin: theme.spacing(0.5),
    fontSize: '14px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderRadius: '10%',
    backgroundColor: 'rgb(195, 0, 255)',
    color: 'white',
    cursor: 'pointer',
  },
}));

// export const Tag = (props) => {
//   const classes = useStyles();
//   const { name } = props;

// };

export const UserTag = (props) => {
  const classes = useStyles();
  const { userId } = props;

  return (
    <Box className={classes.userTag} display="inline-block">
      {setUserTag(userId)}
    </Box>
  );
};

const setUserTag = (userId) => {
  if (userId != 'null') {
    return `@${  userId}`;
  }
};
