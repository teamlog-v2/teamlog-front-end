import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project }) => (
  <Link to="/signUp" style={{ textDecoration: 'none' }}>
    <Card elevation={2}>
      <CardMedia
        style={{ height: 180 }}
        image="https://images.unsplash.com/photo-1617143777034-fe4c261ac738?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {project.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {project.postCount} 개의 게시물
        </Typography>
        <Typography variant="body2" color="textSecondary">
          마지막 업데이트&nbsp;
          {project.updateTime}
        </Typography>
      </CardContent>
    </Card>
  </Link>
);
export default ProjectItem;
