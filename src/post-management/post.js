import UserInfo from './user.js'
import { Tag } from './tag.js'
import { DateInfo } from './datetime.js'
import { Comment, CommentCounter, CommentForm } from './comment.js'
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


// 확장자 대소문자 유의하기

import React, { useState, useEffect } from 'react';


import Avatar from '@material-ui/core/Avatar';

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

const settings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: false, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애니메이션의 속도, 단위는 milliseconds
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    arrows: true
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${theme.palette.divider}`,
    },
    header: {
        height: '4em',
        textAlign: 'left'
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
    position: {

    },
    media: {
        textAlign: 'center',
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

export const Post = (props) => {

    const { postContents, maxWidth } = props;

    const [tagList, setTagList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        setTagList(postContents.post_tag);
        setCommentList(postContents.comment);
        var slides = document.getElementsByClassName('media');
    }, []);

    const classes = useStyles();

    return (
        <Container component="main" maxWidth={maxWidth}>
            <Box className={classes.paper}>
                <Container>
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
                                <Menu />
                                {/*섹션만 나눠놓은 상태. 정교한 배치는 추후에...*/}
                            </Box>
                        </Box>
                    </Container>
                    <Container>
                        <Box className = {classes.position}>
                            <RoomIcon/>
                            여기는 서울입니다.
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

                        <Box id="mediaBox" className={classes.media}>
                            <Slider {...settings}>
                                <Media content={cat1}></Media>
                                <Media content={cat2}></Media>
                                <Media content={cat3}></Media>
                                <Media content={piano}></Media>
                            </Slider>
                        </Box>
                        <Box className={classes.content}>
                            <Typography>{postContents.contents}</Typography>
                        </Box>

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
                </Container>
            </Box>
        </Container>
    );
}