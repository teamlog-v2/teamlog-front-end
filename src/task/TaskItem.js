/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 10,
  margin: '5px 0 5px 0',
  background: isDragging ? 'violet' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const TaskItem = ({ item, index }) => (
  <Draggable
    key={`${item.id}-${item.taskName}`}
    draggableId={`${item.id}-${item.taskName}`}
    index={index}
  >
    {(provided, snapshot) => (
      <Paper
        elevation={3}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        <Typography variant="body1">{item.taskName}</Typography>
      </Paper>
    )}
  </Draggable>
);
export default TaskItem;
