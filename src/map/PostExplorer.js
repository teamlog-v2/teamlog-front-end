import React, { useRef, useState } from 'react';
// import { Motion, spring } from 'react-motion';

function cmpTimeStr(a, b) {
  return new Date(b) - new Date(a);
}

function sortPosts(posts) {
  const res = posts.sort((a, b) => cmpTimeStr(b.writeTimeStr, a.writeTimeStr));

  return res;
}

const PostExplorer = ({ posts, postIds, setSelectedPostIds }) => {
  const [index, setIndex] = useState(0);
  const [prevPostIds] = useState(postIds);
  if (prevPostIds !== postIds) {
    setSelectedPostIds(null);
    setTimeout(() => {
      setSelectedPostIds(postIds);
    });
    return null;
  }

  const ref = useRef(null);

  const [prevPosts, setPrevPosts] = useState(posts);
  const [sortedPosts, setSortedPosts] = useState(sortPosts(posts));
  if (prevPosts !== posts) {
    setPrevPosts(posts);
    setSortedPosts(sortPosts(posts));
  }

  const currentPost = sortedPosts.find((post) => post.id === postIds[index]);

  return (
    <></>
    // <Motion
    //   defaultStyle={{ scale: 0 }}
    //   style={{
    //     scale: spring(1, {
    //       stiffness: 32,
    //       damping: 9,
    //       precision: 0.001,
    //     }),
    //   }}
    // >
    //   {({ scale }) => (
    //     <div
    //       style={{
    //         transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         maxHeight: '80vh',
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'space-between',
    //           alignItems: 'center',
    //           backgroundColor: 'rgba(0, 0, 0, 0.4)',
    //           color: '#FFFFFF',
    //         }}
    //       >
    //         <div style={{ marginLeft: 16 }}>
    //           {/* <Link
    //             style={{ color: 'white' }}
    //             to={`/projects/${currentPost.project.id}`}
    //           >
    //             {currentPost.project.name}
    //           </Link> */}
    //         </div>
    //         <IconButton
    //           onClick={() => {
    //             setSelectedPostIds(null);
    //           }}
    //         >
    //           <Close
    //             style={{
    //               color: 'white',
    //             }}
    //           />
    //         </IconButton>
    //       </div>

    //       <div
    //         ref={ref}
    //         style={{
    //           height: '100%',
    //           overflow: 'auto',
    //           backgroundColor: 'rgba(0, 0, 0, 0.2)',
    //         }}
    //       >
    //         <div
    //           style={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             margin: 16,
    //           }}
    //         >
    //           <div
    //             style={{
    //               marginTop: 'auto',
    //               marginBottom: 'auto',
    //               backgroundColor: '#FFFFFF',
    //             }}
    //           >
    //             <CompressedPost post={currentPost} />
    //           </div>
    //         </div>
    //       </div>

    //       {postIds.length > 1 && (
    //         <div
    //           style={{
    //             display: 'flex',
    //             justifyContent: 'space-evenly',
    //             alignItems: 'center',
    //             backgroundColor: 'rgba(0, 0, 0, 0.4)',
    //             color: '#FFFFFF',
    //           }}
    //         >
    //           <IconButton
    //             disabled={index === 0}
    //             onClick={() => {
    //               ref.current.scrollTo(0, 0);
    //               setIndex(index - 1);
    //             }}
    //           >
    //             <NavigateBefore style={{ color: '#FFFFFF' }} />
    //           </IconButton>
    //           <code>{`${index + 1} / ${postIds.length}`}</code>
    //           <IconButton
    //             disabled={index === postIds.length - 1}
    //             onClick={() => {
    //               ref.current.scrollTo(0, 0);
    //               setIndex(index + 1);
    //             }}
    //           >
    //             <NavigateNext style={{ color: '#FFFFFF' }} />
    //           </IconButton>
    //         </div>
    //       )}
    //     </div>
    //   )}
    // </Motion>
  );
};

export default PostExplorer;
