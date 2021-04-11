import React from 'react'

export const Media = (props) => {
    const { content } = props;

    var fileName = content.toString();
    var fileLength = fileName.length;
    var startIdx = fileName.lastIndexOf('.');

    var fileExtention = String(fileName.substring(startIdx, fileLength).toLowerCase());
    // 확장자 판별

    if (fileExtention == '.mp4') {
        return (
            <Video content={content} />
        );
    } else if (fileExtention == '.png') {
        return(
            <Image content={content} />
        );
        // 조건 더 필요하긴 하겠지만...
    }
}

const Image = (props) => {
    const { content } = props;

    return(
        <img src = {content}/>
    );
}

const Video = (props) => {
    const { content } = props;

    return (
        <video loop controls>
            <source src={content}></source>
        </video>
    );
}