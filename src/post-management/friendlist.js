// import React from 'react'
// import { makeStyles } from '@mui/styles';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import { Avatar } from '@mui/material';

// export const FriendList = (props) => {

//     const {options, onClick} = props;

//     // options 돌리면서
//     // primary에 값 넣으면 됩니다.
//     return (
//         <List>
//             {
//                 options ? options.map((item, index) => {
//                     return (
//                         <ListItem button className='option-active' key={item}
// onClick = {onClick}>
//                             <ListItemIcon>
//                                 <Avatar />
//                             </ListItemIcon>
//                             <ListItemText primary={item} />
//                         </ListItem>
//                     );
//                 }) : ''
//             }
//         </List>
//     );
// }
