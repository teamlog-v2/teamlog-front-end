import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    background-color: ${(props) => props.bgColor || 'none'};
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paper': {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
}));

export default function ResponsiveDialog({ open, updateOpen, children, bgColor, max }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles();

  return (
    <StyledDialog
      className={classes.root}
      fullScreen={fullScreen}
      fullWidth={max}
      maxWidth={max || 'sm'}
      bgColor={bgColor}
      open={open}
      onClose={() => { updateOpen(false); }}
    >
      {children}
    </StyledDialog>
  );
}
