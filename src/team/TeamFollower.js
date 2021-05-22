import { Avatar, Box, Button, Card, CircularProgress, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import { GetFollowTeams, GetTeamFollowers, UnFollowTeam, FollowTeam } from './TeamApi';

const useStyles = makeStyles(() => ({
  profileImg: {
    margin: '10px',
    width: '60px',
    height: '60px',
  },
}));

const TeamFollower = () => {
//   const classes = useStyles();
//   const { id: teamId } = useParams();
//   const [userId] = useContext(AuthContext);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [followers, setFollowers] = useState([]);
//   const [isFollowing, setIsFollowing] = useState();

//   useEffect(async () => {
//     const followersResponse = await GetTeamFollowers(teamId);

//     if (followersResponse.status === 401) {
//       setIsLogin(false);
//       return;
//     }

//     if (followersResponse.status === 200) {
//       setFollowers(await followersResponse.json());
//       const followTeams = await GetFollowTeams(userId);

//       if (followTeams.status === 401) {
//         setIsLogin(false);
//         return;
//       }

//       if (followTeams.status === 200) {
//         const teams = await followTeams.json();
//         const contains = (val) => teams.some(({ id }) => id === val);

//         if (contains(parseInt(teamId, 10))) {
//           setIsFollowing(true);
//         } else {
//           setIsFollowing(false);
//         }
//         setIsLoaded(true);
//       }
//     }
//   }, []);

//   if (!isLogin) {
//     window.console.log('세션이 만료되었습니다. 로그인 화면으로 돌아갑니다.');
//     return <Redirect to="/login" />;
//   }

//   const Follow = async () => {
//     const response = await FollowTeam(teamId);

//     if (response.status === 401) {
//       isLogin(false);
//       return;
//     }

//     if (response.status === 201) {
//       setIsFollowing(true);
//       const followersResponse = await GetTeamFollowers(teamId);
//       if (followersResponse.status === 200) {
//         setFollowers(await followersResponse.json());
//       }
//     }
//   };

//   const Unfollow = async () => {
//     const response = await UnFollowTeam(teamId);

//     if (response.status === 401) {
//       isLogin(false);
//       return;
//     }

//     if (response.status === 200) {
//       setIsFollowing(false);
//       const followersResponse = await GetTeamFollowers(teamId);
//       if (followersResponse.status === 200) {
//         setFollowers(await followersResponse.json());
//       }
//     }
//   };

//   if (!isLoaded) {
//     return (
//       <Grid
//         container
//         direction="column"
//         justify="center"
//         alignItems="center"
//         style={{ minHeight: '100vh' }}
//       >
//         <Grid item>
//           <CircularProgress />
//         </Grid>
//         <Grid item>
//           <Typography> 팔로워 목록을 불러오고 있어요! </Typography>
//         </Grid>
//       </Grid>
//     );
//   }

//     return (
//       <Container maxWidth="md" style={{ marginTop: '2em', marginBottom: '2em' }}>
//         <Container>
//           <Grid container>
//             <Grid item style={{ margin: '1em 0' }} xs={9} sm={10}>
//               <Typography variant="h6">⭐ 팔로워</Typography>
//             </Grid>
//             <Grid item style={{ margin: '1em 0' }} xs={3} sm={2}>
//               {isFollowing ? (
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   fullWidth
//                   onClick={Unfollow}
//                 >팔로잉
//                 </Button>
//               ) : (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   onClick={Follow}
//                 >팔로우
//                 </Button>
//               )}
//             </Grid>
//           </Grid>
//           <Grid container spacing={2}>
//             { followers.length > 0 ? (followers.map((member) => (
//               <Grid key={member.id} item sm={6} xs={12}>
//                 <Card elevation={2}>
//                   <Box display="flex" flexDirection="row">
//                     <Box flexGrow={1}>
//                       <Link
//                         to={`/users/${member.id}`}
//                         style={{ textDecoration: 'none' }}
//                       >
//                         <Box display="flex" alignItems="center">
//                           <Avatar
//                             className={classes.profileImg}
//                             src={member.profileImgPath}
//                           />
//                           <Typography variant="body1" color="textPrimary">
//                             {member.name}
//                           </Typography>
//                         </Box>
//                       </Link>
//                     </Box>
//                   </Box>
//                 </Card>
//               </Grid>
//           ))) : (<Grid item>팀의 첫 번째 팔로워가 되어보세요!</Grid>)}
//           </Grid>
//         </Container>
//       </Container>
// );

return (<div>팀 팔로우 페이지</div>);
};

export default TeamFollower;
