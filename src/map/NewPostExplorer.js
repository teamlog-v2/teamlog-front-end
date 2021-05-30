import {
  Box,
  Button,
  Card,
  Fab,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close, Fullscreen, FullscreenExit } from '@material-ui/icons';
import React, { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useParams } from 'react-router-dom';
import { DateInfo } from '../post-management/datetime';
import { CompressedPost } from '../post-management/post';

function cmpTimeStr(a, b) {
  return new Date(b) - new Date(a);
}

export default function NewPostExplorer({
  posts,
  close,
  explorer,
  isFullMode,
  setFullMode,
}) {
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const sortedPosts = useMemo(() => {
    return posts?.sort((a, b) => {
      return cmpTimeStr(a.writeTimeStr, b.writeTimeStr);
    });
  }, [posts]);

  if (!posts) return null;

  return (
    <Box
      height="100%"
      overflow="auto"
      ref={explorer}
      bgcolor="rgba(0, 0, 0, 0.125)"
    >
      <Box
        position="absolute"
        right="0px"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        margin="1rem"
      >
        <Fab
          style={{ zIndex: 1, opacity: 0.9 }}
          color="primary"
          onClick={() => {
            close?.();
          }}
        >
          <Close style={{ color: 'white' }} />
        </Fab>
        {!isMobile && (
          <>
            <Box height="1rem" />
            <Fab
              style={{ zIndex: 1, opacity: 0.9 }}
              color="primary"
              onClick={() => {
                setFullMode?.((current) => !current);
              }}
            >
              {isFullMode ? (
                <FullscreenExit style={{ color: 'white' }} />
              ) : (
                <Fullscreen style={{ color: 'white' }} />
              )}
            </Fab>
          </>
        )}
      </Box>
      <Box maxWidth="768px" margin="auto">
        {sortedPosts.map((post) => (
          <Box key={post.id} margin="2rem">
            <PostCard post={post} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

//
function PostCard({ post }) {
  const { id: projectId } = useParams();

  return (
    <Card>
      <Box padding="1rem">
        {!projectId && (
          <>
            <Typography variant="" color="primary">
              <CustomLink to={`/projects/${post.project.id}`}>
                {post.project.name}
              </CustomLink>
            </Typography>
            &nbsp;
            <DateInfo dateTime={post.writeTime} />
            <Box height="1rem" />
          </>
        )}
        <CompressedPost post={post} noTime={!projectId} />
      </Box>
    </Card>
  );
}

function CustomLink({ children, ...props }) {
  return (
    <Link style={{ color: '#593875', textDecoration: 'none' }} {...props}>
      {children}
    </Link>
  );
}
