import {Box} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {React, useState, useEffect, ThemeProvider, createMuiTheme} from 'react'



export const LikerCounter = (props) => {
    // 좋아요인지 좋아요 취소인지 필요함.
    const [like, setLike] = useState(false);
    const {count} = props;

    useEffect(() => {
        // 본인이 좋아요 기존이 눌렀냐에 따라
        // 초기 상태 다르게
        setLike(false);
    }, []);

    const onClick = () => {
        setLike(!like);
    }

    const Icon = () => {
        if(like){
            return (<FavoriteIcon color='secondary'/>);
        }else{
            return (<FavoriteBorderIcon/>);
        }
    }

    return( 
        <Box display = 'inline-block' onClick = {onClick}>
            <Icon/>
            {count}
        </Box> 
    );
}

// 혹시 프로젝트 구독같은데 쓸지도 몰라 빼보긴 했는데,
// 뺀다고 해도 폴더는 옮겨야 할 듯