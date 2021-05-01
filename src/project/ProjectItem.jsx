import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const ProjectItem = (props) => {
    return (
        <Card elevation={2}>
            <CardMedia style={{ height: 180 }} image={props.project.thumbnail} />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {props.project.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {props.project.postCount} 개의 게시물
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    마지막 업데이트&nbsp;
                    {props.project.updateTime}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default ProjectItem;