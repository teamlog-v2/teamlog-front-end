// export const subscribe = (beamsClient, id) => {
//  if (!beamsClient) return;

//   return beamsClient
//       .start()
//       .then((beamsClient) => beamsClient.getDeviceId())
//       .then((deviceId) =>
//         console.log("Successfully registered with Beams. Device ID:", deviceId)
//       )
//       .then(() => beamsClient.setDeviceInterests([id])) // device가 구독자가 되며, 사용자마다 다른 interest값을 가질 수 있다
//       .then(() => beamsClient.getDeviceInterests())
//       .then((interests) => console.log("Current interests:", interests))
//       .catch(console.error);
// };

// export const unsubscribe = (beamsClient) => {
//   if (!beamsClient) return;

//   beamsClient.getDeviceInterests()
//     .then((interests) => console.log(interests, "bye bye"));

//   return beamsClient.clearDeviceInterests()
//     .then(() => console.log('Device interests have been cleared'))
//     .catch(e => console.error('Could not clear device interests', e));
// };

// export const requestNewPostNotification = async (userId, projectId) => {
//   const targets = await fetch(`/api/projects/${projectId}/members`)
//   .then((res) => res.json()).then((res) => res.map((member) => member.id));

//   const projectName = await fetch(`/api/projects/${projectId}`)
//   .then((res) => res.json()).then((res) => res.name);

//   console.log(userId, projectId, targets, projectName);

//   try {
//       if (!targets || !projectName) throw `can't notify new post`;
  
//       await fetch('/pusher/push-notification', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           source: userId, // user id
//           targets,
//           projectId,
//           projectName,
//           type: 'post',
//         }),
//       });
//     } catch (error) {
//       console.log(error);
//     }
// };

// export const requestNewCommentNotification = async (writerId, postId, projectId) => {
//   const target = await fetch(`/api/posts/${postId}`).then((res) => res.json()).then((res) => res.writer.id);

//   try {
//     if (!target) throw `can't notify new comment`;

//     await fetch('/pusher/push-notification', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         target,
//         source: writerId,
//         projectId,
//         type: 'comment',
//       }),
//   });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const requestNewReplyNotification = async (target, source, projectId) => {
//   try {
//     if (!target || !source || !projectId) throw `can't notify new reply`;

//     await fetch('/pusher/push-notification', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         target,
//         source,
//         projectId,
//         type: 'reply',
//       }),
//   });
//   } catch (error) {
//     console.log(error);
//   }
// };


// export const requestNewPostLikeNotification = async (postId, source) => {
//   const { target, projectId } = await fetch(`/api/posts/${postId}`)
//     .then((res) => res.json())
//     .then((res) => ({
//     target: res.writer.id,
//     projectId: res.project.id,
//   }));

//   try {
//     if (!target || !source || !projectId) throw `can't notify new reply`;

//     await fetch('/pusher/push-notification', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         target,
//         source,
//         projectId,
//         type: 'postLike',
//       }),
//   });
//   } catch (error) {
//     console.log(error);
//   }
// };
