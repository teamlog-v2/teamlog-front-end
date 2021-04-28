// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import { Avatar } from '@material-ui/core';

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
