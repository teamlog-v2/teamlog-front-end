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
  Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useParams } from 'react-router';
import TaskItem from './TaskItem';
import TaskCreateForm from './TaskCreateForm';
import { getTasksByProject, updateTaskStatus, deleteTask } from './taskService';
import ResponsiveDialog from '../organisms/ResponsiveDialog';

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
  const status = [
    { name: '진행 전', color: '#000000' },
    { name: '진행 중', color: '#000000' },
    { name: '완료', color: '#000000' },
    { name: '실패', color: '#F93B2E' },
  ];
  const projectId = useParams().id;

  const [focusedTask, setFocusedTask] = useState(null);

  const { relation } = props;

  const updateTask = (task) => {
    const to = task.status;
    let from = -1;

    let originIndex = -1;

    state.some((taskList, taskStatus) => { // 전체 태스크 중 기존 태스크 상태 및 위치 탐색
      return taskList.some((item, index) => {
        if (item.id === task.id) {
          from = taskStatus;
          originIndex = index;
          return true;
        }
        return false;
      });
    });

    const updatedState = [...state];

    if (from === to) {
      updatedState[to][originIndex] = task;
    } else {
      updatedState[from].splice(originIndex, 1);
      updatedState[to].push(task);
    }
    setFocusedTask(null);
    setState(updatedState);
  };

  const handleClickOpen = () => { // 태스크 생성 클릭
    setFocusedTask(null);
    setOpen(true);
  };

  const handleDeleteTask = async (task) => {
    try {
      const response = await deleteTask(task.id);
      const result = await response.json();

      const updatedState = [...state];
      const { id, status: taskStatus } = task;
      updatedState[taskStatus] = updatedState[taskStatus].filter((item) => item.id !== id);

      setFocusedTask(null);
      setState(updatedState);
    } catch (err) {
      alert(err);
    }
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

    const newState = [...state];
    if (fromStatusIndex === toStatusIndex) {
      // 같은 공간에 떨어진 경우
      const items = reorder(state[fromStatusIndex], source, destination);
      newState[fromStatusIndex] = items;
    } else {
      // 다른 공간에 떨어진 경우
      result = move(
        state[fromStatusIndex],
        state[toStatusIndex],
        source,
        destination,
      );

      newState[fromStatusIndex] = result[fromStatusIndex];
      newState[toStatusIndex] = result[toStatusIndex];
    }
    const target = newState[toStatusIndex][destination.index];
    target.status = toStatusIndex;
    const data = { status: toStatusIndex, priority: destination.index };

    updateTaskStatus(target.id, data)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
    setFocusedTask(null);
    setState(newState);
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
        <Grid style={{ margin: '3% 0' }}>
          {
            relation === 'MEMBER' || relation === 'MASTER' ? (
              <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                + 태스크 생성
              </Button>
            ) : null
          }
        </Grid>
        <ResponsiveDialog open={open} updateOpen={setOpen}>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} />
            <Box>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <TaskCreateForm
            handleClose={handleClose}
            addTaskInContainer={addTaskInContainer}
            updateTask={updateTask}
            projectId={projectId}
            task={focusedTask}
          />
        </ResponsiveDialog>
        <Grid container spacing={2}>
          <DragDropContext
            onDragEnd={onDragEnd}
            onBeforeDragStart={() => { setFocusedTask(null); }}
          >
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
                        <strong style={{ color: status[ind].color }}>
                          {status[ind].name}
                        </strong>
                        &nbsp;
                        {state[ind].length}
                      </Grid>
                    </Grid>
                    {state[ind].length === 0 ? (
                      <Paper
                        elevation={0}
                        style={{
                          border: '1px solid #eee',
                          padding: 10,
                          opacity: 0.5,
                          margin: '10px 0 5px 0',
                          boxShadow: '0px 0px 2px 1px #eee',
                        }}
                      >
                        <Typography>
                          {`${status[ind].name} 태스크가 없습니다`}
                        </Typography>
                      </Paper>
                    ) : null}
                    {el.map((item, index) => (
                      <TaskItem
                        item={item}
                        index={index}
                        isFocused={item.id === focusedTask?.id ?? false}
                        updateFocusedTask={(event) => {
                          setFocusedTask(item);
                        }}
                        updateFormOpen={() => { setOpen(true); }}
                        handleDeleteTask={handleDeleteTask}
                      />
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
