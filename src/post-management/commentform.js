import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Container, MenuItem, MenuList, Box, Avatar } from '@material-ui/core';
import { CreateComment } from './commentapi';
import {
    makeStyles,
    createMuiTheme,
    ThemeProvider,
  } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    more: {
      marginLeft: '0.25em',
      color: 'rgb(180, 180, 180)',
      paddingTop: '0.5em',
      paddingBottom: '0.5em',
      cursor: 'pointer',
    },
    comment: {
      backgroundColor: 'rgb(245, 245, 245)',
      textAlign: 'left',
    },
    reply: {
      display: 'inline-block',
      right: '0px',
      width: '10%',
      textAlign: 'right',
    },
    icon: {
      cursor: 'pointer',
      width: 'auto',
      display: 'inline-block',
      margin: '0.5em',
    },
    friends: {
      width: '20em',
      height: '25em',
      zIndex: '500',
      overflow: 'auto',
    },
  }));