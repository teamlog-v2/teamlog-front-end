import React from 'react'
import {Avatar, Box} from '@material-ui/core'
import {Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    image: {
        backgroundColor: 'black',
    },
    small: {
        width: '20px',
        height: '20px',
        margin: '2px',
        border: '1px solid grey'
    }
    // 저기요 이미지 크기도 바꿀거면 글씨 크기도 바꾸죠
    // 고민해봅시다
}));


const UserImage = (props) => {

    // 차라리 이미지 용도에 따라 클래스를 선택하는 것이 나으려나...?
    const classes = useStyles();

    const {imgPath} = props;

    return(
        // <Box className = {classes.image} width={imgWidth} height={imgHeight} display='inline-block'>
            
        // </Box>
        
        // 아니 아바타 return까지는 맞는데 따로 설정해줘야 하는 코드 있음.
        // 예제에서는 이렇게 써줬더라
        // root: {
        // display: 'flex',
        // '& > *': {
        // margin: theme.spacing(1),
        //    },
        // },
        <Avatar className = {classes.small} src = {imgPath}/>
    );
}

const UserId = (props) => {
    const {userId, size} = props;

    return (
        <Box display='inline-block' marginLeft='0.25em' fontSize={size}>
            {userId}
        </Box>
    ) ;
}

const UserInfo = (props) => {
    
    const classes = useStyles();
    const {userId , imgWidth, imgHeight, imgPath} = props;

    return(
        <Box display = 'inline-block' className={classes.root}>
            <UserImage imgWidth={imgWidth} imgHeight={imgHeight} imgPath = {imgPath}/>
            <UserId userId = {userId}/>
        </Box>
        // 나는 정보만 줄테니 css는 네가 알아서 하든가... (이런 의도로 작성하고 싶은데...)
    );
}

export default UserInfo;