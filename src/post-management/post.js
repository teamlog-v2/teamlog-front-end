import UserInfo from './user.js'
import {Tag} from './tag.js'
import { DateInfo } from './datetime.js'
import { Comment, CommentCounter, CommentForm } from './comment.js'
import { LikerCounter } from './liker.js'
import { File } from './file.js'
import { Media } from './media.js'

import dao from '../../media/dao.png'
import ogu from '../../media/ogu.PNG'

import cat from '../../media/cat.mp4'
import piano from '../../media/piano.mp4'

// 확장자 대소문자 유의하기

import React, {useState, useEffect} from 'react';


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


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid grey'
    },
    header: {
        height: '4em'
    },
    tags: {
        width: '90%',
        display: 'inline-block'
    },
    menu: {
        width: '10%',
        display: 'inline-block',
        textAlign: 'right',
        cursor: 'pointer'
    },
    media: {
        textAlign: 'center',
    },
    content: {
        marginTop: '0.5em',
        marginBottom: '0.5em'
    },
    files: {
        marginTop: '0.5em',
        marginBottom: '0.5em',
        cursor: 'pointer',
        border: '1px solid grey'
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
        marginBottom: '0.5em'
    },
    comment: {

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export const Post = (props) => {

    const {postContents} = props;

    const [ tagList, setTagList ] = useState([]);
    const [ commentList, setCommentList] = useState([]);

    useEffect(() => {
        setTagList(postContents.post_tag);
        setCommentList(postContents.comment);
        
    }, []);

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md">
            <div className={classes.paper}>
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
                        <Box>
                            <Box className={classes.tags}>
                            {
                                tagList ? tagList.map((item, index) => {
                    
                                    return(
                                        <Tag name = {item.name}/>
                                    );
                                }) : ''
                            }
                            </Box>
                        </Box>
                 
                        <Box className={classes.media}>
                            <Media content={dao}></Media>
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
                                
                                return(
                                    <Comment userId={item.writer_user_id} userTag = 'null' imgPath={ogu} comment_mention = {item.comment_mention} content={item.contents} parent_comment_id = {item.parent_comment_id}/>
                                )
                            }) : ''
                        }
                        
                    </Container>
                    <CommentForm />
                </Container>
            </div>
        </Container>
    );
}