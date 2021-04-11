import React from 'react'
import {Box} from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Link } from 'react-router-dom'


export const File = (props) => {
    const {file} = props;

    // 파일 다운받는 부분은 알아볼 필요 o

    return(
        <Box>
            <AttachFileIcon/>
                {file}
        </Box>
    );
}

