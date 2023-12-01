import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ManufactureDate } from '../post-management/datetime';
import { convertResourceUrl } from '../utils';

const ProjectItem = ({ project }) => {
  const history = useHistory();

  return (
    <>
      <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
        <Card elevation={2}>
          <CardMedia
            style={{ height: 180 }}
            image={convertResourceUrl(project.thumbnail)}
          >
            {project.team === null ? null : (
              <Box zIndex={1} padding="0.8rem 0.8rem" style={{ opacity: 0.9 }} />
            )}
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h6" noWrap>
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
    </>
  );
};
export default ProjectItem;
