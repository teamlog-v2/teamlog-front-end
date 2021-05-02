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

// const CommentForm = (props) => {
//     const classes = useStyles();
//     const { options, postId, parentCommentId } = props;
  
//     const [state, setState] = useState({
//       activeOption: 0,
//       filteredOptions: [],
//       showOptions: false,
//       userInput: '',
//       tagStartIndex: -1,
//     });
  
//     const inputRef = useRef();
//     const [menuFocus, setMenuFocus] = useState(false);
  
//     menuFocus
//       ? (document.body.style.overflow = 'hidden')
//       : (document.body.style.overflow = 'unset');
      
  
//     const onKeyDown = (e) => {
//       // 위 화살표 or 아래 화살표
//       if ((state.showOptions && e.keyCode === 38) || e.keyCode === 40) {
//         setMenuFocus(true);
//       }
//     };
  
//     // const CreateComment = (resetFunc) => { 
//     //   let comment = {
//     //     parentCommentId: parentCommentId,
//     //     writerId: 'string', // 이미 알고있어야 하는 아이디
//     //     postId: postId, 
//     //     contents: inputRef.current.value,
//     //     commentMentions: [] // 여기에 이제 해시태그...
//     //   }
  
//     //   // fetch('http://3.15.16.150:8090/api/comments/', {
//     //   //   method: 'POST',
//     //   //   headers: {
//     //   //     'Content-Type': 'application/json'
//     //   //   },
//     //   //   body: JSON.stringify(comment)
//     //   // }).then((res) => alert(res.status));
//     // }
  
//     const onSelect = () => {
//       let index = inputRef.current.selectionStart;
  
//       setMenuFocus(false);
  
//       if (state.userInput.charAt(index - 2) == '@') {
//         setState({
//           ...state,
//           tagStartIndex: index - 2,
//         });
//       }
//     };
  
//     const onChange = (e) => {
//       const userInput = e.currentTarget.value;
  
//       setState({
//         ...state,
//         userInput: e.currentTarget.value,
//       });
  
//       let index = inputRef.current.selectionStart;
  
//       if (
//         state.tagStartIndex > -1 &&
//         userInput.charAt(state.tagStartIndex) == '@'
//       ) {
//         // const splitName = userInput.substring(state.tagStartIndex + 1).split(' ')[0];
//         const splitName = userInput.substring(
//           state.tagStartIndex + 1,
//           inputRef.current.selectionStart,
//         );
  
//         if (splitName.length == 0) return;
  
//         const filteredOptions = options.filter(
//           (option) => option.toLowerCase().indexOf(splitName.toLowerCase()) > -1,
//         );
  
//         setState({
//           ...state,
//           activeOption: 0,
//           filteredOptions,
//           showOptions: true,
//           userInput: e.currentTarget.value,
//         });
  
//         if (filteredOptions.length > 0) {
//           setOpen(true);
//           setAnchorEl(e.currentTarget);
//         } else {
//           setOpen(false);
//           setAnchorEl(null);
//         }
//       } else {
//         setOpen(false);
//         setAnchorEl(null);
  
//         setState({
//           ...state,
//           activeOption: 0,
//           filteredOptions: [],
//           showOptions: false,
//           userInput: e.currentTarget.value,
//         });
//       }
//     };
  
//     const onClick = (e) => {
//       setOpen(false);
//       setAnchorEl(null);
  
//       let startStr = userInput.substring(0, state.tagStartIndex);
//       let midStr = '@' + e.currentTarget.innerText + ' ';
//       let lastStr = userInput.substring(
//         inputRef.current.selectionStart,
//         userInput.length,
//       );
  
//       setState({
//         activeOption: 0,
//         filteredOptions: [],
//         showOptions: false,
//         userInput: startStr + midStr + lastStr,
//         tagStartIndex: -1,
//       });
  
//       setMenuFocus(false);
  
//       inputRef.current.focus();
//     };
  
//     const { activeOption, filteredOptions, showOptions, userInput } = state;
  
//     const [open, setOpen] = useState(false);
//     const [anchorEl, setAnchorEl] = useState(null);
  
//     const handleToggle = () => {
//       setOpen((prevOpen) => !prevOpen);
//     };
  
//     const handleClose = (event) => {
//       //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       //     return;
//       //   }
  
//       setOpen(false);
//     };
  
//     const handleListKeyDown = (event) => {
//       if (event.key === 'Tab') {
//         event.preventDefault();
//         setOpen(false);
//       }
//     };
  
//     const theme = createMuiTheme({
//       palette: {
//         primary: {
//           main: 'rgb(220, 220, 220)',
//         },
//       },
//     });
  
//     return (
//       <Container>
//         <Box
//           component="form"
//           marginTop="1em"
//           marginBottom="1em"
//           width="auto"
//           height="auto"
//         >
//           <Box width="80%" display="inline-block">
//             <Fragment>
//               <InputBase
//                 name="reply"
//                 className={classes.input}
//                 placeholder="댓글을 입력하세요."
//                 multiline
//                 fullWidth
//                 inputRef={inputRef}
//                 onChange={onChange}
//                 onSelect={onSelect}
//                 onKeyDown={onKeyDown}
//                 value={state.userInput}
//               />
//             </Fragment>
//           </Box>
//           <Box width="20%" display="inline-block">
//             <ThemeProvider theme={theme}>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick = {() => CreateComment(parentCommentId, 'string', postId, inputRef.current.value, [])}
//               >
//                 작성
//               </Button>
//             </ThemeProvider>
//           </Box>
//         </Box>
//         <Popper
//           open={open}
//           disablePortal
//           style={{ zIndex: 1 }}
//           anchorEl={anchorEl}
//           placement="top-start"
//           role={undefined}
//           transition
//           disablePortal
//         >
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{
//                 transformOrigin:
//                   placement === 'bottom' ? 'center top' : 'center bottom',
//               }}
//             >
//               <Paper className={classes.postMenu}>
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <FriendList
//                     autoFocus={menuFocus}
//                     options={filteredOptions}
//                     onClick={onClick}
//                   />
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>
//       </Container>
//     );
//   };

  // export default CommentForm;
