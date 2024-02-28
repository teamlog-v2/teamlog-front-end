import {
  Avatar,
  Box, Button, Container, ListItemIcon, ListItemText, MenuItem, MenuList
} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { makeStyles } from '@mui/styles';
import {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import AuthContext from '../contexts/auth';
import { GetProjectMembers } from '../project-management/projectApi';
import { convertResourceUrl } from '../utils';
import { CreateComment } from './commentapi';

const useStyles = makeStyles(() => ({
  more: {
    marginLeft: '0.25em',
    color: 'rgb(180, 180, 180)',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    cursor: 'pointer',
  },
  friends: {
    width: '18em',
    height: '24em',
    overflow: 'auto',
  },
  replyTarget: {
    marginLeft: '0.25em',
    padding: '0.25em',
  },
  closeReply: {
    display: 'inline-block',
    right: '1em',
    cursor: 'pointer',
  },
}));

const CommentForm = (props) => {
  const classes = useStyles();
  const {
    parentCommentId,
    postId,
    projectId,
    addLatestComment,
    setIsRefreshed,
    updateCommentCount,
  } = props;
  const [options, setOptions] = useState([]);
  const inputRef = useRef();
  const [menuFocus, setMenuFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [state, setState] = useState({
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    accountInput: '',
    tagStartIndex: -1,
  });
  const [accountId] = useContext(AuthContext);

  useEffect(async () => {
    setState({ ...state, accountInput: '' });

    const membersResponse = await GetProjectMembers(projectId);
    setOptions(await membersResponse.json());
  }, []);

  const onKeyDown = (e) => {
    // 위 화살표 or 아래 화살표
    if ((state.showOptions && e.keyCode === 38) || e.keyCode === 40) {
      setMenuFocus(true);
    }
  };

  // 커서 위치에 따른 멘션 시작점 설정용
  const onSelect = () => {
    const index = inputRef.current.selectionStart;

    setMenuFocus(false);

    if (state.accountInput.charAt(index - 2) === '@') {
      setState({
        ...state,
        tagStartIndex: index - 2,
      });
    }
  };

  // 입력할 때
  const onChange = (e) => {
    const accountCurrentInput = e.currentTarget.value;

    setState({
      ...state,
      accountInput: e.currentTarget.value,
    });

    if (accountCurrentInput === '') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }

    if (
      state.tagStartIndex > -1
      && accountCurrentInput.charAt(state.tagStartIndex) === '@'
    ) {
      const splitName = accountCurrentInput.substring(
        state.tagStartIndex + 1,
        inputRef.current.selectionStart,
      );

      if (splitName.length === 0) return;

      const filteredOptions = options.filter(
        (option) => option.id.toLowerCase().indexOf(splitName.toLowerCase()) > -1
          || option.name.toLowerCase().indexOf(splitName.toLowerCase()) > -1,
      );

      setState({
        ...state,
        activeOption: 0,
        filteredOptions,
        showOptions: true,
        accountInput: e.currentTarget.value,
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
        accountInput: e.currentTarget.value,
      });
    }
  };

  // 특정 유저 선택시
  const onClick = (e) => {
    setOpen(false);
    setAnchorEl(null);

    const target = e.currentTarget.dataset.myValue;

    const startStr = state.accountInput.substring(0, state.tagStartIndex);
    const midStr = `@${target} `;
    const lastStr = state.accountInput.substring(
      inputRef.current.selectionStart,
      state.accountInput.length,
    );

    setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      accountInput: startStr + midStr + lastStr,
      tagStartIndex: -1,
    });

    setMenuFocus(false);

    inputRef.current.focus();
  };

  // 댓글 등록 시 언급된 사용자 골라내기
  const setSelectedAccount = (commentContent) => {
    const mentionSplitList = commentContent.split('@');
    const selectedAccountList = [];

    for (let i = 0; i < mentionSplitList.length; i += 1) {
      const accountSplit = mentionSplitList[i].split(' ')[0];

      const filteredAccount = options.filter(
        (option) => option.id.toLowerCase() === accountSplit.toLowerCase(),
      );

      if (
        filteredAccount.length === 1
        && !selectedAccountList.includes(filteredAccount[0].id)
      ) {
        selectedAccountList.push(filteredAccount[0].id);;
      }
    }

    return selectedAccountList;;
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container disableGutters style={{ margin: '2% 0', padding: '0 2%' }}>
      <Box
        component="form"
        width="auto"
        height="auto"
      >
        <Box width="80%" display="inline-block">
          <>
            <InputBase
              name="reply"
              className={classes.input}
              placeholder="댓글을 입력하세요."
              multiline
              fullWidth
              inputRef={inputRef}
              onChange={onChange}
              value={state.accountInput}
              onSelect={onSelect}
              onKeyDown={onKeyDown}
              disabled={!accountId}
            />
          </>
        </Box>
        <Box width="20%" display="inline-block">
          <Button
            variant="outlined"
            fullWidth
            color="primary"
            disabled={isEmpty}
            onClick={async () => {
              // 댓글 등록
              setIsRefreshed(false);
              const response = await CreateComment(
                parentCommentId,
                postId,
                inputRef.current.value,
                setSelectedAccount(inputRef.current.value),
              );

              if (response.status === 201) {
                const createdComment = await response.json();
                addLatestComment(createdComment);
                setState({ ...state, accountInput: '' });
                updateCommentCount(1);
              }

              setIsRefreshed(true);
            }}
          >
            작성
          </Button>
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
                  options={state.filteredOptions}
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
                onClick={onClick}
              >
                <ListItemIcon>
                  <Avatar src={convertResourceUrl(item.profileImgPath)} />
                </ListItemIcon>
                <ListItemText primary={item.name} secondary={item.id} />
              </MenuItem>
            ))
            : null}
        </MenuList>
      </Box>
    </Container>
  );
};

export default CommentForm;
