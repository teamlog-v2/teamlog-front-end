import { Delete, Update } from '@mui/icons-material';
import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledIcon = styled(Typography)`
  & > * {
    font-size: medium;
  }
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #593875;
  }
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 10,
  margin: '10px 0 5px 0',
  backgroundColor: isDragging ? '#C09FCB' : 'white',
  boxShadow: '0px 0px 2px 1px #eee',
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
