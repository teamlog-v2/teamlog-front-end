import React from 'react'
import {Box} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export const LikerCounter = (props) => {
    // 좋아요인지 좋아요 취소인지 필요함.

    const {count} = props;

    return( 
        <Box display = 'inline-block'>
            <FavoriteIcon/>
            {count}
        </Box> 
    );
}

// 혹시 프로젝트 구독같은데 쓸지도 몰라 빼보긴 했는데,
// 뺀다고 해도 폴더는 옮겨야 할 듯