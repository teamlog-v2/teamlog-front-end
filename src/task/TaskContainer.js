/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  Grid,
  Chip,
  Typography,
  Button,
  Dialog,
  Box,
  CircularProgress,
  IconButton,
  Container,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useParams } from 'react-router';
import TaskItem from './TaskItem';
import TaskCreateForm from './TaskCreateForm';
import { getTasksByProject, updateTaskStatus } from './taskService';

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

const TaskContainer = (props) => {
  const [state, setState] = useState([[], [], [], []]);
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const status = ['진행 전', '진행 중', '완료', '실패'];
  const projectId = useParams().id;

  const { relation } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addTaskInContainer = (task) => {
    const newState = [...state];
    newState[task.status].push(task);
    setState(newState);
  };

  useEffect(() => {
    (async () => {
      setIsLoaded(false);
      const newState = [...state];
      newState.forEach((container) => {
        container.length = 0;
      });
      setState(newState);
      let tasks;
      try {
        const response = await getTasksByProject(projectId);
        tasks = await response.json();
      } catch (err) {
        alert(err);
        setIsLoaded(false);
      }
      tasks.forEach((task) => {
        addTaskInContainer(task);
      });
      setIsLoaded(true);
    })();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const fromStatusIndex = +source.droppableId;
    const toStatusIndex = +destination.droppableId;

    if (fromStatusIndex === toStatusIndex) {
      // 같은 공간에 떨어진 경우
      const items = reorder(state[fromStatusIndex], source, destination);
      const newState = [...state];
      newState[fromStatusIndex] = items;
      setState(newState);
    } else {
      // 다른 공간에 떨어진 경우
      result = move(
        state[fromStatusIndex],
        state[toStatusIndex],
        source,
        destination,
      );
      const newState = [...state];
      newState[fromStatusIndex] = result[fromStatusIndex];
      newState[toStatusIndex] = result[toStatusIndex];
      // --- db  수정 ------
      const target = newState[toStatusIndex][destination.index];
      const data = { status: toStatusIndex };
      updateTaskStatus(target.id, data)
        .then((res) => res.json())
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
      setState(newState);
    }
  };

  if (!isLoaded) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
        <Grid item>
          <Typography> 태스크 목록을 불러오고 있어요!</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Container maxWidth="md">
        <Grid style={{ margin: '2% 0' }}>
          {
            relation === 'MEMBER' || relation === 'MASTER' ? (
              <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                + 태스크 생성
              </Button>
            ) : null
          }
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} />
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <TaskCreateForm
            handleClose={handleClose}
            addTaskInContainer={addTaskInContainer}
            projectId={projectId}
          />
        </Dialog>
        <Grid container spacing={2}>
          <DragDropContext onDragEnd={onDragEnd}>
            {state.map((el, ind) => (
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided) => (
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Chip
                          varient="contained"
                          color="primary"
                          label={status[ind]}
                        />
                      </Grid>
                      <Grid item>
                        <Typography>{state[ind].length}</Typography>
                      </Grid>
                    </Grid>
                    {state[ind].length === 0 ? (
                      <Grid>
                        <p>없어요</p>
                      </Grid>
                  ) : null}
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
      </Container>
    </>
  );
};
export default TaskContainer;
