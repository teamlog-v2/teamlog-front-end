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

const CommentList = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);
  // const [childCommentList, setChildCommentList] = useState([]);

  const SetCommentList = useCallback(async() => {
    alert("메롱");
    setCommentList(await GetComment(postId));
  })

  useEffect(async () => {   
    // fetch(`http://3.15.16.150:8090/api/comments/${postId}`)
    //   .then((res) => res.json()).then((info) => setCommentList(info));
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
                type="child"
              />
                );
                
              }) : []
            }
          </>);
          
}) : []}
        <CommentForm
            options={[
              '신동헌',
              '신현정',
              '이희수',
              '윤진',
              '오득환',
              '이현아',
              '김사람',
              '이사람',
              '강소공',
              'Zaki Mars Stewart',
              '박지훈',
              '박소공',
              '김소공',
              '김시관',
              '김성렬',
              '김선명',
              '김민종',
              '김효진',
              '김초코',
              '김커피',
              '김생수',
              '김에어',
              '김지현',
            ]}
            parentCommentId={null}
            postId={postId}
            setCommentList = {SetCommentList}
          />
    </>
  );
};

//////////

const CommentForm = (props) => {
  const classes = useStyles();
  const { options, postId, parentCommentId, setCommentList } = props;
  const [selectedUserList, setSelectedUserList] = useState([]);

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

  // const CreateComment = (resetFunc) => { 
  //   let comment = {
  //     parentCommentId: parentCommentId,
  //     writerId: 'string', // 이미 알고있어야 하는 아이디
  //     postId: postId, 
  //     contents: inputRef.current.value,
  //     commentMentions: [] // 여기에 이제 해시태그...
  //   }

  //   // fetch('http://3.15.16.150:8090/api/comments/', {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   //   },
  //   //   body: JSON.stringify(comment)
  //   // }).then((res) => alert(res.status));
  // }

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
      // const splitName = userInput.substring(state.tagStartIndex + 1).split(' ')[0];
      const splitName = userInput.substring(
        state.tagStartIndex + 1,
        inputRef.current.selectionStart,
      );

      if (splitName.length == 0) return;

      const filteredOptions = options.filter(
        (option) => option.toLowerCase().indexOf(splitName.toLowerCase()) > -1,
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
    const target = e.currentTarget.innerText;

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

    for(var i = 0; i < mentionSplitList.length; i = i + 1){
      const userSplit = mentionSplitList[i].split(' ')[0];

      const filteredUser = options.filter(
        (option) => option.toLowerCase() === userSplit.toLowerCase()
      );

      if (filteredUser.length === 1 && !selectedUserList.includes(filteredUser[0])) {
        setSelectedUserList(selectedUserList.concat(filteredUser[0]));
      }
    }

    console.log(selectedUserList);
  }

  const { activeOption, filteredOptions, showOptions, userInput } = state;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //     return;
    //   }

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
                setSelectedUser(inputRef.current.value);
                // await CreateComment(parentCommentId, 'string', postId, inputRef.current.value, selectedUserList);
                // setCommentList();
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

  /*
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });
  */

  // 디바이스 구분?

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
                onClick={onClick}>
                    <ListItemIcon>
                      <Avatar />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </MenuItem>
                )): null
          }
        </MenuList>
      </Box>
    </Container>
  );
};


export default CommentList;
