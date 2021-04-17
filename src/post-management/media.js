import { Box } from '@material-ui/core';
import React from 'react'

export const Media = (props) => {
    const { content, maxWidth, maxHeight } = props;

    var fileName = content.toString();
    var fileLength = fileName.length;
    var startIdx = fileName.lastIndexOf('.');

    var fileExtention = String(fileName.substring(startIdx, fileLength).toLowerCase());
    // 확장자 판별

    if (fileExtention == '.mp4') {
        return (
            <Video content={content} width='100%'/>
        );
    } else if (fileExtention == '.png') {
        return(
            <ImageContent content={content} width='100%' />
        );
        // 조건 더 필요하긴 하겠지만...
    }
}

const ImageContent = (props) => {
    const { content, width, height } = props;

    const image = new Image();
    image.src = content.toString();
    console.log(image.width);

        return(
            <img src = {content} width = '100%'/>
        );
}

const Video = (props) => {
    const { content, width, height } = props;

    return (
        <video width={width} loop controls>
            <source src={content}></source>
        </video>
    );
}