import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
    comment: {
        backgroundColor: 'rgb(255, 255, 255)'
    },
    reply: {
        // display='inline-block' right='0px' width='10%' textAlign='right'
        display: 'inline-block',
        right: '0px',
        width: '10%',
        textAlign: 'right'
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
        // path는 나중에 알아서 정해라
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

    useEffect(() => {
        setTagList(comment_mention);
    }, []);

    var margin_left = CheckRoot(parent_comment_id);

    return (
        <Box className={classes.comment} border='1px solid grey'>
            <Box marginLeft={margin_left}>
                <Box display='inline-block' width='90%'>
                    <Header userId={userId} imgPath={imgPath} />
                    <Box>
                        <DateInfo year='2021' month='04' date='06' fs='11px' />
                    </Box>
                </Box>

                <Box className={classes.reply}>
                    <ReplyIcon />
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

        </Box>
    );
}

export const CommentForm = (props) => {
    return (
        <Container>
            <Box display='inline-block' width='80%'>
                <TextField variant='outlined' fullWidth multiline />
            </Box>
            <Box display='inline-block' bgcolor='pink' width='20%'>
                <Button variant="contained" color="primary" fullWidth>작성</Button>
            </Box>
        </Container>
    );
}


