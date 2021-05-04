import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ManufactureDate } from '../post-management/datetime';

const ProjectItem = ({ project }) => (
  <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
    <Card elevation={2}>
      <CardMedia
        style={{ height: 180 }}
        image={project.thumbnail}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {project.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {project.postCount} 개의 게시물
        </Typography>
        <Typography variant="body2" color="textSecondary">
          마지막 업데이트&nbsp;·&nbsp;
          {ManufactureDate(project.updateTime)}
        </Typography>
      </CardContent>
    </Card>
  </Link>
);
export default ProjectItem;
