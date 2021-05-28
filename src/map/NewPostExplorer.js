import {
  Box,
  Button,
  Card,
  Fab,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DateInfo } from '../post-management/datetime';
import { CompressedPost } from '../post-management/post';

function cmpTimeStr(a, b) {
  return new Date(b) - new Date(a);
}

export default function NewPostExplorer({ posts, close, explorer }) {
  if (!posts) return null;

  const sortedPosts = useMemo(() => {
    return posts.sort((a, b) => {
      return cmpTimeStr(a.writeTimeStr, b.writeTimeStr);
    });
  }, [posts]);

  return (
    <Box
      height="100%"
      overflow="auto"
      ref={explorer}
      bgcolor="rgba(0, 0, 0, 0.125)"
    >
      <Box display="flex" justifyContent="flex-end">
        <Fab
          style={{ zIndex: 1, position: 'absolute', margin: '1rem' }}
          color="primary"
          onClick={() => {
            close();
          }}
        >
          <Close style={{ color: 'white' }} />
        </Fab>
      </Box>
      {sortedPosts.map((post) => (
        <Box key={post.id} margin="2rem">
          <PostCard post={post} />
        </Box>
      ))}
    </Box>
  );
}

//
function PostCard({ post }) {
  return (
    <Card>
      <Box padding="1rem">
        <Typography variant="" color="primary">
          <CustomLink to={`/projects/${post.project.id}`}>
            {post.project.name}
          </CustomLink>
        </Typography>
        &nbsp;
        <DateInfo dateTime={post.writeTime} />
        <Box height="1rem" />
        <CompressedPost post={post} noTime />
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
