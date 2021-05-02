import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Container, MenuItem, MenuList, Box, Avatar } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import UserInfo from './user';
import { DateInfo } from './datetime';
import { UserTag } from './tag';
import CommentForm from './commentform'

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

const Content = (props) => {
  const { contents } = props;

  return (
    <Box marginTop="0.5em" marginBottom="0.5em" display="inline-block">
      {contents}
    </Box>
  );
};

const Header = (props) => {
  const { userId, imgPath } = props;
  return (
    <Box>
      <UserInfo userId={userId} imgPath={imgPath} />
    </Box>
  );
};

export const MoreComment = () => {
  const classes = useStyles();

  return(
    <Box className = {classes.more}>
      댓글 더 보기 . . .
    </Box>
  );
}

export const CommentCounter = (props) => {
  const { count } = props;
  return (
    <Box display="inline-block">
      <ChatBubbleOutlineIcon />
      {count}
    </Box>
  );
};

const CheckRoot = (type) => {
  if (type === 'child') {
    return {
      marginLeft: '1.5em', 
      buttonDisplay: 'hidden'
    }; 
  }

  return {
    marginLeft: '0.5em', 
    buttonDisplay: 'block'
  }; 
};

export const Comment = (props) => {
  const { id, type ,postId, writeTime, writer, commentMentions, contents} = props;
  const classes = useStyles();
  
  const [tagList, setTagList] = useState([]);
  const [formVisibility, setVisibility] = useState('none');
  

  useEffect(() => {
    setTagList(commentMentions);
  }, []);

  
  const commentStyle = CheckRoot(type);

  return (
    <Box className={classes.comment}>
      <Box marginLeft={commentStyle.marginLeft}>
        <Box display="inline-block" width="90%">
          <Header userId={writer.id} imgPath={writer.profileImgPath} />
          <Box>
           <DateInfo dateTime = {writeTime} fs="11px" />
          </Box>
        </Box>

        <Box className={classes.reply} visibility={commentStyle.buttonDisplay}>
          <Box
            className={classes.icon}
            onClick={() => {
              if (formVisibility === 'none') {
                setVisibility('block');
              } else {
                setVisibility('none');
              }
            }}
          >
            <ReplyIcon color="action" />
          </Box>
        </Box>
        <Box>
          <Box display="inline-block" width="90%">
            {tagList
              ? tagList.map((item) => <UserTag userId={item.target_user_id} />)
              : null}
            <Content contents={contents} />
          </Box>
        </Box>
      </Box>

      <Box display={formVisibility}>
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
            'pink',
          ]}
          parentCommentId={id}
          postId={postId}
        />
      </Box>
    </Box>
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

// export const CommentForm = (props) => {
//   const classes = useStyles();
//   const { options, postId, parentCommentId } = props;

//   const [state, setState] = useState({
//     activeOption: 0,
//     filteredOptions: [],
//     showOptions: false,
//     userInput: '',
//     tagStartIndex: -1,
//   });

//   const inputRef = useRef();
//   const [menuFocus, setMenuFocus] = useState(false);

//   menuFocus
//     ? (document.body.style.overflow = 'hidden')
//     : (document.body.style.overflow = 'unset');
    

//   const onKeyDown = (e) => {
//     // 위 화살표 or 아래 화살표
//     if ((state.showOptions && e.keyCode === 38) || e.keyCode === 40) {
//       setMenuFocus(true);
//     }
//   };

//   const CreateComment = () => { 
//     let comment = {
//       parentCommentId: parentCommentId,
//       writerId: 'string', // 이미 알고있어야 하는 아이디
//       postId: postId, 
//       contents: inputRef.current.value
//     }

//     alert(parentCommentId + " " + postId);

//     fetch('http://localhost:8090/api/comments/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(comment)
//     }).then((res) => alert(res.status));
//   }

//   const onSelect = () => {
//     let index = inputRef.current.selectionStart;

//     setMenuFocus(false);

//     if (state.userInput.charAt(index - 2) == '@') {
//       setState({
//         ...state,
//         tagStartIndex: index - 2,
//       });
//     }
//   };

//   const onChange = (e) => {
//     const userInput = e.currentTarget.value;

//     setState({
//       ...state,
//       userInput: e.currentTarget.value,
//     });

//     let index = inputRef.current.selectionStart;

//     if (
//       state.tagStartIndex > -1 &&
//       userInput.charAt(state.tagStartIndex) == '@'
//     ) {
//       // const splitName = userInput.substring(state.tagStartIndex + 1).split(' ')[0];
//       const splitName = userInput.substring(
//         state.tagStartIndex + 1,
//         inputRef.current.selectionStart,
//       );

//       if (splitName.length == 0) return;

//       const filteredOptions = options.filter(
//         (option) => option.toLowerCase().indexOf(splitName.toLowerCase()) > -1,
//       );

//       setState({
//         ...state,
//         activeOption: 0,
//         filteredOptions,
//         showOptions: true,
//         userInput: e.currentTarget.value,
//       });

//       if (filteredOptions.length > 0) {
//         setOpen(true);
//         setAnchorEl(e.currentTarget);
//       } else {
//         setOpen(false);
//         setAnchorEl(null);
//       }
//     } else {
//       setOpen(false);
//       setAnchorEl(null);

//       setState({
//         ...state,
//         activeOption: 0,
//         filteredOptions: [],
//         showOptions: false,
//         userInput: e.currentTarget.value,
//       });
//     }
//   };

//   const onClick = (e) => {
//     setOpen(false);
//     setAnchorEl(null);

//     let startStr = userInput.substring(0, state.tagStartIndex);
//     let midStr = '@' + e.currentTarget.innerText + ' ';
//     let lastStr = userInput.substring(
//       inputRef.current.selectionStart,
//       userInput.length,
//     );

//     setState({
//       activeOption: 0,
//       filteredOptions: [],
//       showOptions: false,
//       userInput: startStr + midStr + lastStr,
//       tagStartIndex: -1,
//     });

//     setMenuFocus(false);

//     inputRef.current.focus();
//   };

//   const { activeOption, filteredOptions, showOptions, userInput } = state;

//   const [open, setOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
//     //     return;
//     //   }

//     setOpen(false);
//   };

//   const handleListKeyDown = (event) => {
//     if (event.key === 'Tab') {
//       event.preventDefault();
//       setOpen(false);
//     }
//   };

//   const theme = createMuiTheme({
//     palette: {
//       primary: {
//         main: 'rgb(220, 220, 220)',
//       },
//     },
//   });

//   return (
//     <Container>
//       <Box
//         component="form"
//         marginTop="1em"
//         marginBottom="1em"
//         width="auto"
//         height="auto"
//       >
//         <Box width="80%" display="inline-block">
//           <Fragment>
//             <InputBase
//               name="reply"
//               className={classes.input}
//               placeholder="댓글을 입력하세요."
//               multiline
//               fullWidth
//               inputRef={inputRef}
//               onChange={onChange}
//               onSelect={onSelect}
//               onKeyDown={onKeyDown}
//               value={state.userInput}
//             />
//           </Fragment>
//         </Box>
//         <Box width="20%" display="inline-block">
//           <ThemeProvider theme={theme}>
//             <Button
//               parentCommentId = '1'
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick = {CreateComment}
//             >
//               작성
//             </Button>
//           </ThemeProvider>
//         </Box>
//       </Box>
//       <Popper
//         open={open}
//         disablePortal
//         style={{ zIndex: 1 }}
//         anchorEl={anchorEl}
//         placement="top-start"
//         role={undefined}
//         transition
//         disablePortal
//       >
//         {({ TransitionProps, placement }) => (
//           <Grow
//             {...TransitionProps}
//             style={{
//               transformOrigin:
//                 placement === 'bottom' ? 'center top' : 'center bottom',
//             }}
//           >
//             <Paper className={classes.postMenu}>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <FriendList
//                   autoFocus={menuFocus}
//                   options={filteredOptions}
//                   onClick={onClick}
//                 />
//               </ClickAwayListener>
//             </Paper>
//           </Grow>
//         )}
//       </Popper>
//     </Container>
//   );
// };

// CommentForm.propTypes = {
//   options: PropTypes.instanceOf(Array),
// };
