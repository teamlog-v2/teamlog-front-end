import { Avatar } from '@mui/material';
import React from 'react';
import { convertResourceUrl } from '../utils';

const CustomizedAvatar = (props) => {
    const { size, imgPath } = props;

    return <Avatar sx={{
        width: (theme) => theme.spacing(size),
        height: (theme) => theme.spacing(size)
    }}
        src={convertResourceUrl(imgPath)}
    />
}

const AppBarAvatar = (props) => <CustomizedAvatar imgPath={props.imgPath} size={3} />
const ProjectAvatar = (props) => <CustomizedAvatar imgPath={props.imgPath} size={5} />

export { AppBarAvatar, ProjectAvatar };
