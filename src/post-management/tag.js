import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

export const Tag = (props) => {
  const classes = useStyles();
  const { name } = props;
  return (
    <Box className={classes.tag} display="inline-block">
      # {name}
    </Box>
  );
};

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
    return '@' + userId;
  }
};
