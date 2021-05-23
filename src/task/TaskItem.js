/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Close, Delete, Update } from '@material-ui/icons';
import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';

const StyledIcon = styled(Typography)`
  & > * {
    font-size: medium;
  }
  cursor: pointer;
  &:hover {
    color: #C16AF5;
  }
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 10,
  margin: '5px 0 5px 0',
  backgroundColor: 'none',
  border: isDragging ? '2px solid #C16AF5' : '2px solid #eee',
  // styles we need to apply on draggables
  ...draggableStyle,
});

const TaskItem = ({ item, index, isFocused, updateFocusedTask,
  updateFormOpen, handleDeleteTask }) => (
    <>
      <Draggable
        key={`${item.id}-${item.taskName}`}
        draggableId={`${item.id}-${item.taskName}`}
        index={index}
      >
        {(provided, snapshot) => (
          <>
            <Paper
              elevation={0}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
              onClick={() => {
                  updateFocusedTask(item);
              }}
            >
              <Typography variant="body1">{item.taskName}</Typography>
            </Paper>
            {
              isFocused && (
              <Grid container justify="flex-end">
                <StyledIcon onClick={updateFormOpen}>
                  <Update />
                </StyledIcon>
                &nbsp;
                <StyledIcon onClick={() => { handleDeleteTask(item); }}>
                  <Delete />
                </StyledIcon>
              </Grid>
              )
            }
          </>
        )}
      </Draggable>
    </>
);

export default TaskItem;
