import { Box } from '@material-ui/core';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { VerifiedUserOutlined } from '@material-ui/icons';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;


const useStyles = makeStyles((theme) => ({
    align: {
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain'
    },
}));

export const Media = (props) => {
    const { content, frameWidth, frameHeight } = props;

    var fileName = content.toString();
    var fileLength = fileName.length;
    var startIdx = fileName.lastIndexOf('.');

    var fileExtention = String(fileName.substring(startIdx, fileLength).toLowerCase());

    // 확장자 판별

    if (fileExtention == '.mp4') {
        return (
            <Video content={content} width='100%' />
        );
    } else if (fileExtention == '.png' || fileExtention == '.jpg') {
        return (
            <ImageContent content={content} />
        );
        // 조건 더 필요하긴 하겠지만...
    }
}

const ImageContent = (props) => {
    const { content, frameWidth, frameHeight } = props;
    const classes = useStyles();

    const image = new Image();
    image.src = content.toString();

    // 세로로 길면 세로로 맞춰줄까

    if (image.width >= image.height) {
        return (
            <Box width='100%' className={classes.align}>
                <img src={content} width='100%' />
            </Box>
        );
    } else {
        return (
            <Box height='100%' className={classes.align}>
                <img src={content} height='100%' />
            </Box>
        );
    }
}

const Video = (props) => {
    const { content, width, height } = props;
    const classes = useStyles();

    const image = new Image();
    image.src = content.toString();
    console.log(image.videoWidth)

    return (
        <Box>
            <video className={classes.align} controls>
                <source src={content}></source>
            </video>
        </Box>

    );
}