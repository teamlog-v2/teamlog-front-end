import React from 'react';
import { Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { getProject } from '../project-management/projectapi';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
}));

const ProjectItem = (props) => {
  const classes = useStyles();
  
  return(
    <Link to = {`projects/${props.project.id}`}>
    <Card elevation={2} className={classes.root}>
    <CardMedia style={{ height: 180 }} image={props.project.thumbnail} />
    <CardContent>
      <Typography gutterBottom variant="h6">
        {props.project.name}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {props.project.postCount} 개의 게시물
      </Typography>
      <Typography variant="body2" color="textSecondary">마지막 업데이트&nbsp;
        {props.project.updateTime}
      </Typography>
    </CardContent>
  </Card>
  </Link>
  );
};

export default ProjectItem;
