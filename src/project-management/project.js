import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Header } from './header.js';


const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));


const sections = [
    { title: '홈', url: '#' },
    { title: '포스트', url: '#' },
    { title: '태스크', url: '#' },
    { title: '멤버', url: '#' },
    { title: '팔로워', url: '#' }
];

export const Project = () => {
    return (
        <React.Fragment>
            <CssBaseline />

            <Header title="도쿄 여행 프로젝트" introduction="동창 친구 넷이서 떠나는 도쿄 여행" sections={sections} />
            <main>


            </main>
        </React.Fragment>
    );
}