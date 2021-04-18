

import UserInfo from './user.js'
import { Tag } from './tag.js'
import { DateInfo } from './datetime.js'
import { Comment, CommentCounter, CommentForm } from './comment.js'
import { useMediaQuery } from "react-responsive"
import { LikerCounter } from './liker.js'
import { File } from './file.js'
import { Media } from './media.js'



import dao from '../../src/media/dao.png'
import ogu from '../../src/media/ogu.PNG'

import cat from '../../src/media/cat.mp4'
import piano from '../../src/media/piano.mp4'

import cat1 from '../../src/media/cat1.PNG'
import cat2 from '../../src/media/cat2.PNG'
import cat3 from '../../src/media/cat3.PNG'
import cat4 from '../../src/media/cat4.PNG'

import "./carousel-theme.css";
import "./carousel.css";
import Slider from "react-slick"
import RoomIcon from '@material-ui/icons/Room';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import React, { useState, useEffect } from 'react';


import Avatar from '@material-ui/core/Avatar'

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Menu } from '@material-ui/icons'
import { Button } from '@material-ui/core'

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

const settings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: false, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애니메이션의 속도, 단위는 milliseconds
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    arrows: true,

};

const useStyles = makeStyles((theme) => ({

    paper: {
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${theme.palette.divider}`,
    },
    header: {
        height: '4em',
        paddingTop: '1em',
        textAlign: 'left',
    },
    tags: {
        width: '100%',
        display: 'inline-block',
        textAlign: 'left'
    },
    menu: {
        width: '10%',
        display: 'inline-block',
        textAlign: 'right',
        cursor: 'pointer'
    },
    location: {
        paddingTop: '0.25em',
        paddingBottom: '0.25em',
        cursor: 'pointer'
    },
    postMenu: {
        zIndex: 5
    },
    media: {
        position: 'relative',
       
        // backgroundColor: 'black',
        objectFit: 'contain'
        //모바일 ver, pc ver 높이 필요할 듯        
    },
    content: {
        marginTop: '0.5em',
        marginBottom: '0.5em',
        textAlign: 'left'
    },
    files: {
        marginTop: '0.5em',
        marginBottom: '0.5em',
        cursor: 'pointer',
        border: `1px solid ${theme.palette.divider}`,
        textAlign: 'left'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    etc: {
        height: '2.5em',
        marginTop: '0.25em',
        marginBottom: '0.5em',
        textAlign: 'left'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const PostMenu = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Menu />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper className={classes.postMenu}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                                        <MenuItem onClick={handleClose}>수정</MenuItem>
                                        <MenuItem onClick={handleClose}>수정 내역</MenuItem>
                                        <MenuItem onClick={handleClose}>삭제</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}

const MediaList = () => {
    const classes = useStyles();
    
    const isPc = useMediaQuery({
        query : "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query : "(min-width:768px) and (max-width:1023px)"
    });
    const isMobile = useMediaQuery({
        query : "(max-width:767px)"
    });
    
    let size = isPc ? '60em' : isTablet ? '45em' : '30em';

    return (<Box id="mediaBox" textAlign='center'>
        <Slider {...settings}>
            <Box className={classes.media} height={size}>
                
                <Media content={cat1}></Media>
                {/* <Box bgcolor='yellow' width='500px' left='10px' display='inline-block'>sjfkjd</Box> */}
            </Box>
            <Box className={classes.media} height={size}>
                <Media content={cat2}></Media>
            </Box>
            <Box className={classes.media} height={size}>
                <Media content={cat3}></Media>
            </Box>
            {/* <Box className={classes.media}>
            <Media content={piano}></Media>
        </Box> */}
        </Slider>
    </Box>);
}


export const Post = (props) => {

    const { postContents, maxWidth } = props;

    const [tagList, setTagList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        setTagList(postContents.post_tag);
        setCommentList(postContents.comment);
        var slides = document.getElementsByClassName('media');
    }, []);

    return (
        <Container component="main" maxWidth={maxWidth} disableGutters>
            <Box className={classes.paper}>
                <Container>
                    <Box className={classes.header}>
                        <Box display='inline-block' width='90%'>
                            <Box>
                                <UserInfo userId={postContents.writer_user_id} imgWidth='30px' imgHeight='30px' imgPath={ogu} />
                            </Box>
                            <Box>
                                <DateInfo year='2021' month='04' date='06' fs='11px' />
                            </Box>
                        </Box>

                        <Box className={classes.menu}>
                            <PostMenu />
                        </Box>
                    </Box>
                </Container>
                <Container>
                    <Box className={classes.location}>
                        <RoomIcon />
                        {postContents.location}
                    </Box>
                </Container>
                <Container>
                    <Box>
                        <Box className={classes.tags}>
                            {
                                tagList ? tagList.map((item, index) => {
                                    return (
                                        <Tag name={item.name} />
                                    );
                                }) : ''
                            }
                        </Box>
                    </Box>
                </Container>
                <Container>
                    <MediaList />
                </Container>
                <Container>
                    <Box className={classes.content}>
                        <Typography>{postContents.contents}</Typography>
                    </Box>
                </Container>
                <Container>
                    <Box className={classes.files}>
                        <File file='오구.jpg' />
                    </Box>

                    <Box className={classes.etc}>

                        <LikerCounter count={postContents.likerCnt} />
                        <CommentCounter count={postContents.commentCnt} />
                    </Box>
                </Container>
                <Container>
                    {
                        commentList ? commentList.map((item, index) => {
                            return (
                                <Comment userId={item.writer_user_id} userTag='null' imgPath={ogu} comment_mention={item.comment_mention} content={item.contents} parent_comment_id={item.parent_comment_id} />
                            )
                        }) : ''
                    }

                </Container>
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
                ]} />
            </Box>
        </Container>
    );
}