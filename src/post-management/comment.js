import React, { useEffect, useState, Fragment, useRef} from 'react';
import { Container } from '@material-ui/core';
import { Box } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import UserInfo from './user.js';
import { DateInfo } from './datetime.js';
import { UserTag } from './tag.js'
import PropTypes from "prop-types";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme) => ({
    comment: {
        backgroundColor: 'rgb(255, 255, 255)',
        textAlign: 'left',
    },
    reply: {
        // display='inline-block' right='0px' width='10%' textAlign='right'
        display: 'inline-block',
        right: '0px',
        width: '10%',
        textAlign: 'right'
    },
    icon: {
        cursor: 'pointer',
        width: 'auto',
        display: 'inline-block'
    },
    friends: {
        width: '20em',
        height: '25em',
        zIndex: '500',
        overflow: 'auto',
    }
}));

const Content = (props) => {
    const { content } = props;

    return (
        <Box marginTop='0.5em' marginBottom='0.5em' display='inline-block'>
            {content}
        </Box>
    );
}

const Header = (props) => {
    const { userId, imgPath } = props;
    return (
        <Box>
            <UserInfo userId={userId} imgPath={imgPath}></UserInfo>
        </Box>
    );
}

export const CommentCounter = (props) => {
    const { count } = props;
    return (
        <Box display='inline-block'>
            <ChatBubbleOutlineIcon />
            {count}
        </Box>
    );
}

const CheckRoot = (parent_comment_id) => {
    if (parent_comment_id != null) {
        return '1.5em'; // 대댓글 들여쓰기
    }

    return '0.25em';
}



export const Comment = (props) => {
    const { userId, imgPath, comment_mention, content, parent_comment_id, userTag } = props;
    const classes = useStyles();

    const [tagList, setTagList] = useState([]);
    const [visibility, setVisibility] = useState('none');


    useEffect(() => {
        setTagList(comment_mention);
    }, []);


    var margin_left = CheckRoot(parent_comment_id);

    return (
        <Box className={classes.comment} border='1px solid `${theme.palette.divider}'>
            <Box marginLeft={margin_left}>
                <Box display='inline-block' width='90%'>
                    <Header userId={userId} imgPath={imgPath} />
                    <Box>
                        <DateInfo year='2021' month='04' date='06' fs='11px' />
                    </Box>
                </Box>

                <Box className={classes.reply}>
                    <Box className={classes.icon} onClick={() => { if (visibility == 'none') { setVisibility('block') } else { setVisibility('none') } }}>
                        <ReplyIcon />
                    </Box>
                </Box>
                <Box>
                    <Box display='inline-block' width='90%'>
                        {
                            tagList ? tagList.map((item, index) => {
                                return (
                                    <UserTag userId={item.target_user_id} />
                                )
                            }) : ''
                        }
                        <Content content={content} />
                    </Box>
                </Box>
            </Box>

            <CommentForm options={[
                "신동헌",
                "신현정",
                "이희수",
                "윤진",
                "오득환",
                "이현아",
                "김사람",
                "이사람",
                "강소공",
                "pink"
            ]} visibility={visibility} />
        </Box>
    );
}

const FriendList = (props) => {

    const classes = useStyles();
    const { options, onClick } = props;

    return (
        <Container disableGutters>
            <Box className = {classes.friends}>
                <List>
                    {
                        options ? options.map((item, index) => {
                            return (
                                <ListItem button className='option-active' key={item} onClick={onClick}>
                                    <ListItemIcon>
                                        <Avatar />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                            );
                        }) : ''
                    }
                </List>
            </Box>
        </Container>
    );
}


export const CommentForm = ({ options, visibility }) => {

    const classes = useStyles();

    // const defaultProps = {
    //     options: []
    // };

    const [state, setState] = useState({
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: "",
        tagStartIndex: 1
    });

    const inputRef = useRef();
    const [selectionStart, setSelectionStart] = useState(0);

    const onSelect = () => {
        setSelectionStart(inputRef.current.selectionStart);
        console.log(selectionStart);
    }

    const onChange = (e) => {
        // 와 근데 서버측으로 넘길거까지 계산하려면 복잡하겠다
        // 버그가 좀 있어 추후 조금 많이 손보기
        // 커서 받아오고 하는 작업이면 onSelect가 더 맞겠는데...?
        // 아 둘 다 필요하겠구나...ㅎㅎ

        const userInput = e.currentTarget.value;
        console.log(userInput.length + " " + userInput);

        
        // 

        if ((state.tagStartIndex == 1 && userInput.charAt(state.tagStartIndex - 1) == '@')
            || (state.tagStartIndex != 1 && userInput.charAt(state.tagStartIndex - 1) == '@' && userInput.charAt(state.tagStartIndex - 2) == ' ')) {
            const filteredOptions = options.filter(
                (option) => option.toLowerCase().indexOf(userInput.substring(state.tagStartIndex).toLowerCase()) > -1
            );

            setState({
                ...state,
                activeOption: 0,
                filteredOptions,
                showOptions: true,
                userInput: e.currentTarget.value
            });

            console.log(filteredOptions.length);

            if(filteredOptions.length > 0){
                setOpen(true);
                setAnchorEl(e.currentTarget);
            }else{
                setOpen(false);
                setAnchorEl(null);
            }
        } else {
            setOpen(false);
            setAnchorEl(null);

            setState({
                activeOption: 0,
                filteredOptions: [],
                showOptions: false,
                userInput: e.currentTarget.value,
                tagStartIndex: userInput.length
            });
        }
    };

    const onClick = (e) => {
        setOpen(false);
        setAnchorEl(null);

        setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: userInput.substr(0, state.tagStartIndex) + e.currentTarget.innerText,
            tagStartIndex: userInput.length + 1
        });
    };

    const onKeyDown = (e) => {
        const { activeOption, filteredOptions } = state;

        // enter
        if (e.keyCode === 13) {
            if ((state.tagStartIndex == 1 && userInput.charAt(state.tagStartIndex - 1) == '@')
                || (state.tagStartIndex != 1 && userInput.charAt(state.tagStartIndex - 1) == '@' && userInput.charAt(state.tagStartIndex - 2) == ' ')) {
                setState({
                    ...state,
                    activeOption: 0,
                    showOptions: false,
                    userInput: userInput.substr(0, state.tagStartIndex) + filteredOptions[activeOption] + ' ',
                    tagStartIndex: userInput.length + 1
                });
            }

        }

        // 위 화살표
        else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }

            setState({ ...state, activeOption: activeOption - 1 });
        }

        // 아래 화살표
        else if (e.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                return;
            }

            setState({ ...state, activeOption: activeOption + 1 });
        }
    };

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

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    return (
        <Container>
            <Box component="form" display={visibility} marginTop='1em' marginBottom='1em'>
                <Box width='80%' display='inline-block'>
                    <Fragment>
                        <InputBase
                            className={classes.input}
                            placeholder="댓글을 입력하세요."
                            multiline
                            fullWidth
                            inputRef = {inputRef}
                            onChange={onChange} onSelect={onSelect} onKeyDown={onKeyDown} value={state.userInput}
                        />
                    </Fragment>
                </Box>
                <Box width='20%' display='inline-block'>
                    <Button fullWidth variant='contained' color='primary'>등록</Button>
                </Box>
            </Box>
            <Popper open={open} disablePortal style={{ zIndex: 1 }} anchorEl={anchorEl} placement='top-start' role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper className={classes.postMenu}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <FriendList options={filteredOptions} onClick={onClick} />
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Container>
    );
}

CommentForm.propTypes = {
    options: PropTypes.instanceOf(Array)
}

