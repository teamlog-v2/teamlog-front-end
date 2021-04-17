import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Header } from './header.js';
import { Introduction } from './introduction.js'
import { Postlist } from '../post-management/postlist.js'
import { Typography, Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));


const sections = [
    { title: '홈', url: '#' },
    { title: '포스트', url: '/post' },
    { title: '태스크', url: '/task' },
    { title: '멤버', url: 'member' },
    { title: '팔로워', url: 'follower' }
];

export const Project = () => {
    return (
        <React.Fragment>
            <CssBaseline />

            <Header title="도쿄 여행 프로젝트" introduction="동창 친구 넷이서 떠나는 도쿄 여행" sections={sections} />
            <Container maxWidth='xl'>
                <Title title = '도쿄 여행 프로젝트 소개' />
                <Introduction name = '도쿄 여행 프로젝트' master_user_id = 'jduck1024' follower_count={15} member_count={60}/>
            </Container>
            
            <Container maxWidth='x1'>
                <Title title = '스토리보드' />
                <Postlist/>
            </Container>
        </React.Fragment>
    );
}

const Title = (props) => {
    const {title} = props;

    return(
        <Box margin = '0.5em'>
            <Typography variant="h6">{title}</Typography>
        </Box>
    );
}