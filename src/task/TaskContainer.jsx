import React, { useState,useEffect } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid, Chip, Typography } from '@material-ui/core';
import TaskItem from "./TaskItem";
import TaskCreateDialog from "./TaskCreateDialog"
import { getTasksByProject, updateTaskStatus } from './TaskService'

const reorder = (list, droppableSource, droppableDestination) => {
  const result = Array.from(list);
  const [removed] = result.splice(droppableSource.index, 1);
  result.splice(droppableDestination.index, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const TaskContainer = () => {
  const [state, setState] = useState([[],[],[],[]]);
  const [status] = useState(["진행 전", "진행 중", "완료", "실패"]);

  const addTaskInContainer = (task) => {
    const newState = [...state];
    newState[task.status].push(task);
    setState(newState);
  }

  const initializeData = () => {
    const newState = [...state];
    newState.map(container => {
      container.length=0;
    })
    setState(newState);
    getTasksByProject()
      .then((response) => response.json())
      .then((tasks) => {
        tasks.map(task => {
          addTaskInContainer(task)
          console.log("gkgk")
        })
      })
  }

  useEffect(() => {
    initializeData();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const fromStatusIndex = +source.droppableId;
    const toStatusIndex = +destination.droppableId;

    if (fromStatusIndex === toStatusIndex) { // 같은 공간에 떨어진 경우
      const items = reorder(state[fromStatusIndex], source, destination);
      const newState = [...state];
      newState[fromStatusIndex] = items;
      setState(newState);
    } else { // 다른 공간에 떨어진 경우
      const result = move(state[fromStatusIndex], state[toStatusIndex], source, destination);
      const newState = [...state];
      newState[fromStatusIndex] = result[fromStatusIndex];
      newState[toStatusIndex] = result[toStatusIndex];
      // --- db  수정 ------
      const target = newState[toStatusIndex][destination.index]
      var data = { status: toStatusIndex };
      updateTaskStatus(target.id, data)
        .then(res => res.json())
        .then(response => console.log('Success'))
        .catch(error => console.error('Error'))

      setState(newState);
    }
  }

  return (
    <>
      <Typography variant="h3">태스크 목록</Typography>
      <br />
      <TaskCreateDialog addTaskInContainer={addTaskInContainer} />
      <br />
      <Grid container spacing={2}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <Grid item sm={3} xs={12}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Chip varient="contained" color="primary" label={status[ind]} />
                  {el.map((item, index) => (
                    <TaskItem item={item} index={index} />
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Grid>
    </>
  );
}
export default TaskContainer;