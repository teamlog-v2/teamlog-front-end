import React from 'react'
import { Paper, Typography } from '@material-ui/core';
import { Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 10,
  margin: "0 0 5px 0",
  background: isDragging ? "violet" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});
export default function TaskItem(props) {
  return (

    <Draggable
      key={props.item.id+"-"+props.item.taskName}
      draggableId={props.item.id+"-"+props.item.taskName}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Paper
          elevation={3}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Typography variant="body1">
            {props.item.taskName}
          </Typography>
        </Paper>
      )}
    </Draggable>
  )
}
