import { IconButton } from '@material-ui/core';
import { Close, NavigateBefore, NavigateNext } from '@material-ui/icons';
import React, { useState } from 'react';
import { Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';
// import { Post } from '../post-management/post';

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

  const currentPost = posts.find((post) => post.id === postIds[index]);

  return (
    <Motion
      defaultStyle={{ scale: 0 }}
      style={{
        scale: spring(1, {
          stiffness: 32,
          damping: 9,
          precision: 0.001,
        }),
      }}
    >
      {({ scale }) => (
        <div
          style={{
            transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
            display: 'flex',
            flexDirection: 'column',
            height: 360,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#3f51b5',
            }}
          >
            <div style={{ marginLeft: 16 }}>
              <Link
                style={{ color: '#FFFFFF' }}
                to={`/projects/${currentPost.project.id}`}
              >
                {currentPost.project.name}
              </Link>
            </div>
            <IconButton
              onClick={() => {
                setSelectedPostIds(null);
              }}
            >
              <Close
                style={{
                  color: '#FFFFFF',
                }}
              />
            </IconButton>
          </div>

          <div
            style={{
              height: '100%',
              overflow: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: 16,
              }}
            >
              <div
                style={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {/* <Post maxWidth="md" postContents={currentPost} /> */}
                <div>
                  Content
                  <br />
                  ContententifneContent
                  <br />
                  ContententifneContent
                  <br />
                  <br />
                  ContententifneContent ContententifneContent
                  <br />
                  ContententifneContent
                  <br />
                  <br />
                  ContententifneContent
                  <br />
                  ContententifneContent
                  <br />
                  ContententifneContent
                  <br />
                  <br />
                  ContententifneContent
                  <br />
                  <br />
                  ContententifneContent Content
                  <br />
                  <br />
                  ContententifneContent
                  <br />
                  ContententifneContent Content
                  <br />
                  ContententifneContent
                  <br />
                  ContententifneContent
                  <br />
                </div>
              </div>
            </div>
          </div>

          {postIds.length > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                color: '#FFFFFF',
              }}
            >
              <IconButton
                disabled={index === 0}
                onClick={() => {
                  setIndex(index - 1);
                }}
              >
                <NavigateBefore style={{ color: '#FFFFFF' }} />
              </IconButton>
              <code>{`${index + 1} / ${postIds.length}`}</code>
              <IconButton
                disabled={index === postIds.length - 1}
                onClick={() => {
                  setIndex(index + 1);
                }}
              >
                <NavigateNext style={{ color: '#FFFFFF' }} />
              </IconButton>
            </div>
          )}
        </div>
      )}
    </Motion>
  );
};

export default PostExplorer;
