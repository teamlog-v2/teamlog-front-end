import { Box, Card, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { DateInfo } from '../post-management/datetime';
import { CompressedPost } from '../post-management/post';

export default function NewPostExplorer({ posts, close }) {
  return posts.map((post) => <PostCard key={post.id} post={post} />);
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
