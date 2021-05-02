import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 10,
  margin: '5px 0 5px 0',
  background: isDragging ? 'violet' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const TaskItem = ({ item, provided, snapshot }) => (
  <Paper
    elevation={3}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={getItemStyle(
      snapshot.isDragging,
      provided.draggableProps.style,
    )}
  >
    <Typography variant="body1">{item.taskName}</Typography>
  </Paper>
);
export default TaskItem;
