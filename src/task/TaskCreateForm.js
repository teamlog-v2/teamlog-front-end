import React, { useState } from 'react';
import {
  Container,
  Backdrop,
  CircularProgress,
  Button,
  TextField,
  Radio,
  RadioGroup,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  FormLabel,
  Dialog,
  Avatar,
  makeStyles,
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import MultiTimePicker from './MultiTimePicker';
import { createTask, putTask } from './taskService';
import UserSelect from '../user/UserSelect';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const getDate = (date) => {
  if (date) {
    const formattedDate = [...date];
    const month = date[1];
    formattedDate[1] = month - 1;
    return new Date(...formattedDate);
  }
  return new Date();
}

const TaskCreateForm = ({ projectId, addTaskInContainer, handleClose, task, updateTask }) => {
  const classes = useStyles();
  const [taskName, setTaskName] = useState(task?.taskName??'');
  const [status, setStatus] = useState(task?.status??0);

  const [deadline, setDeadline] = useState(getDate(task?.deadline));
  const [selectedUsers, setSelectedUsers] = useState(task?.performers??[]);
  const [openUserSelect, setopenUserSelect] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClickOpen = () => {
    setopenUserSelect(true);
  };
  const handleUserSelectClose = () => {
    setopenUserSelect(false);
  };

  const getDeadlineValue = (value) => {
    setDeadline(value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value * 1);
  };
  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = async (event) => {
    // task 기존에 있었다면 update request
    setIsProcessing(true);
    event.preventDefault();
    let performersId = selectedUsers.map(({ id }) => id);

    console.log(deadline);

    const data = {
      taskName,
      performersId,
      deadline,
      status,
    };

    console.log('updated data');
    console.log(data);

    try {
      let response;

      if (task) response = await putTask(task.id, data);
      else response = await createTask(projectId, data);

      if (task) {
        console.log('put');
      }
      else console.log('create');

      const { status } = response;
      const res = await response.json();

      console.log('수정 결과');
      console.log(res);

      if (status === 201) {
        addTaskInContainer(res);
        handleClose();
      } else if (status === 200) {
        updateTask(res);
        handleClose();
      } else {
        alert('실패');
      }
      setIsProcessing(false);
    } catch (err) {
      console.error('Error');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={isProcessing}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="xs" style={{ margin: '3% 0' }}>
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <Dialog open={openUserSelect}>
              <UserSelect
                projectId={projectId}
                selectedUsers={selectedUsers.map(({ id }) => id)}
                setSelectedUsers={setSelectedUsers}
                handleClose={handleUserSelectClose}
              />
            </Dialog>
            <Grid container spacing={2}>
              <Grid item xs={12} align="center">
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="taskName"
                  name="taskName"
                  fullWidth
                  id="taskName"
                  label="태스크 이름"
                  autoFocus
                  value={taskName}
                  onChange={handleTaskNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  태스크 수행자
                </Typography>
                <Button
                  variant="transparent"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  {selectedUsers.length === 0 ? (
                    <Avatar color="primary">
                      <AddIcon />
                    </Avatar>
                  ) : (
                    <>
                      <AvatarGroup max={4}>
                        {selectedUsers.map((user) => (
                          <Avatar alt={user.name} src={user.profileImgPath} />
                        ))}
                      </AvatarGroup>
                    </>
                  )}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <MultiTimePicker
                  id="deadline"
                  name="deadline"
                  label="마감일"
                  value={deadline}
                  getDeadlineValue={getDeadlineValue}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">태스크 상태</FormLabel>
                <RadioGroup value={status} onChange={handleStatusChange} row>
                  <FormControlLabel
                    value={0}
                    control={<Radio color="primary"/>}
                    label="진행 전"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio color="primary"/>}
                    label="진행 중"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio color="primary" />}
                    label="완료"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Box paddingTop="12px" paddingBottom="12px">
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
              >
                {task ? '수정' : '생성'}
              </Button>
            </Box>
          </form>
        </div>
      </Container>
    </>
  );
};
export default TaskCreateForm;
