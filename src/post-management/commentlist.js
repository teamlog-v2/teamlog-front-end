// import { Post } from './post';
// import data from './datalist';
import { Comment } from './comment';
import { Button, ListItemIcon, ListItemText } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import {Reac, useEffect, useState, Fragment, useRef, useCallback } from 'react';
import { Container, MenuItem, MenuList, Box, Avatar } from '@material-ui/core';
import { CreateComment, GetComment } from './commentapi';
import { getProjectMembers } from '../project-management/projectapi';
import {
    makeStyles,
    createMuiTheme,
    ThemeProvider,
  } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import CommentForm from './commentform';

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
    // display='inline-block' right='0px' width='10%' textAlign='right'
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

export const CommentList = ({ projectId, postId }) => {
  const [commentList, setCommentList] = useState([]);

  const SetCommentList = useCallback(async() => {
    setCommentList(await GetComment(postId));
  });

  useEffect(async () => {   
    setCommentList(await GetComment(postId));
  }, []);

  return (
    <>
      {commentList
        ? commentList.map((item) => {
          let childCommentList = item.childComments;
          return (<>
            <Comment
              id={item.id}
              projectId={projectId}
              contents={item.contents}
              writer={item.writer}
              commentMentions={item.commentMentions}
              postId={postId}
              writeTime={item.writeTime}
              type="parent"
            />
            {
              childCommentList ? childCommentList.map((childItem) => {
                return(
                  <Comment
                id={childItem.id}
                contents={childItem.contents}
                writer={childItem.writer}
                commentMentions={childItem.commentMentions}
                postId={postId}
                writeTime={childItem.writeTime}
                setCommentList = {SetCommentList}
                type="child"
              />
                );
              }) : []
            }
          </>);
}) : []}
        <CommentForm
            parentCommentId={null}
            projectId={projectId}
            postId={postId}
            setCommentList = {SetCommentList}
        />
    </>
  );
};

//////////

export const CommentForm = (props) => {
  const classes = useStyles();
  const { /* options, */ postId, projectId, parentCommentId, setCommentList } = props;
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    setOptions(await getProjectMembers(projectId));
  }, []);

  const [state, setState] = useState({
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: '',
    tagStartIndex: -1,
  });

  const inputRef = useRef();
  const [menuFocus, setMenuFocus] = useState(false);

  menuFocus
    ? (document.body.style.overflow = 'hidden')
    : (document.body.style.overflow = 'unset');
    
  const onKeyDown = (e) => {
    // 위 화살표 or 아래 화살표
    if ((state.showOptions && e.keyCode === 38) || e.keyCode === 40) {
      setMenuFocus(true);
    }
  };

  const onSelect = () => {
    let index = inputRef.current.selectionStart;

    setMenuFocus(false);

    if (state.userInput.charAt(index - 2) == '@') {
      setState({
        ...state,
        tagStartIndex: index - 2,
      });
    }
  };

  const onChange = (e) => {
    const userInput = e.currentTarget.value;

    setState({
      ...state,
      userInput: e.currentTarget.value,
    });

    let index = inputRef.current.selectionStart;

    if (
      state.tagStartIndex > -1 &&
      userInput.charAt(state.tagStartIndex) == '@'
    ) {

      const splitName = userInput.substring(
        state.tagStartIndex + 1,
        inputRef.current.selectionStart,
      );

      if (splitName.length == 0) return;

      const filteredOptions = options.filter(
        (option) => option.id.toLowerCase().indexOf(splitName.toLowerCase()) > -1 
        || option.name.toLowerCase().indexOf(splitName.toLowerCase()) > -1,
      );

      setState({
        ...state,
        activeOption: 0,
        filteredOptions,
        showOptions: true,
        userInput: e.currentTarget.value,
      });

      if (filteredOptions.length > 0) {
        setOpen(true);
        setAnchorEl(e.currentTarget);
      } else {
        setOpen(false);
        setAnchorEl(null);
      }
    } else {
      setOpen(false);
      setAnchorEl(null);

      setState({
        ...state,
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: e.currentTarget.value,
      });
    }
  };

  // 특정 유저 선택시
  const onClick = (e) => {
    setOpen(false);
    setAnchorEl(null);

    const target = e.currentTarget.dataset.myValue;

    let startStr = userInput.substring(0, state.tagStartIndex);
    let midStr = '@' + target + ' ';
    let lastStr = userInput.substring(
      inputRef.current.selectionStart,
      userInput.length,
    );

    setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: startStr + midStr + lastStr,
      tagStartIndex: -1,
    });

    setMenuFocus(false);

    inputRef.current.focus();
  };


  // 선택된 사용자 골라내기
  const setSelectedUser = (commentContent) => {
    const mentionSplitList = commentContent.split('@');
    const selectedUserList = [];

    for(var i = 0; i < mentionSplitList.length; i = i + 1){
      const userSplit = mentionSplitList[i].split(' ')[0];

      const filteredUser = options.filter(
        (option) => option.id.toLowerCase() === userSplit.toLowerCase()
      );

      if (filteredUser.length === 1 && !selectedUserList.includes(filteredUser[0].id)) {
        selectedUserList.push(filteredUser[0].id);
      }
    }

    return selectedUserList;
  }

  const { activeOption, filteredOptions, showOptions, userInput } = state;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: 'rgb(220, 220, 220)',
      },
    },
  });

  return (
    <Container>
      <Box
        component="form"
        marginTop="1em"
        marginBottom="1em"
        width="auto"
        height="auto"
      >
        <Box width="80%" display="inline-block">
          <Fragment>
            <InputBase
              name="reply"
              className={classes.input}
              placeholder="댓글을 입력하세요."
              multiline
              fullWidth
              inputRef={inputRef}
              onChange={onChange}
              value={state.userInput}
              onSelect={onSelect}
              onKeyDown={onKeyDown}
              value={state.userInput}
            />
          </Fragment>
        </Box>
        <Box width="20%" display="inline-block">
          <ThemeProvider theme={theme}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick = { async () => {
                await CreateComment(parentCommentId, 'jduckling1024', postId, inputRef.current.value, setSelectedUser(inputRef.current.value));
                setCommentList();
                setState({...state, userInput: ""});
              }}
            >
              작성
            </Button>
          </ThemeProvider>
        </Box>
      </Box>
      <Popper
        open={open}
        disablePortal
        style={{ zIndex: 1 }}
        anchorEl={anchorEl}
        placement="top-start"
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper className={classes.postMenu}>
              <ClickAwayListener onClickAway={handleClose}>
                <FriendList
                  autoFocus={menuFocus}
                  options={filteredOptions}
                  onClick={onClick}
                />
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Container>
  );
};

const FriendList = (props) => {
  const classes = useStyles();
  const { options, onClick, autoFocus } = props;

  return (
    <Container disableGutters>
      <Box className={classes.friends}>
        <MenuList autoFocusItem={autoFocus} variant="selectedMenu">
          {options
            ? options.map((item) => (
              <MenuItem 
                button
                className="option-active"
                key={item}
                data-my-value={item.id}
                onClick={onClick}>
                    <ListItemIcon>
                      <Avatar />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                )): null
          }
        </MenuList>
      </Box>
    </Container>
  );
};
