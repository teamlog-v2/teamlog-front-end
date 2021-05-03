import React, { useState } from 'react';
import {
  Container,
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
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import MultiTimePicker from './MultiTimePicker';
import { createTask } from './taskService';
import UserSelect from '../user/UserSelect';

const TaskCreateForm = ({ projectId, addTaskInContainer, handleClose }) => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('0');
  const [deadline, setDeadline] = useState(new Date());
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openUserSelect, setopenUserSelect] = useState(false);

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
    setStatus(event.target.value);
  };
  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let performersId = selectedUsers.map(({ id }) => id);
    const data = {
      taskName,
      performersId,
      deadline,
      status,
    };
    try {
      const response = await createTask(projectId, data);
      const res = await response.json();
      console.log(res);
      addTaskInContainer(data);
      handleClose();
    } catch (err) {
      console.error('Error');
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
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
                <Typography component="h1" variant="h5">
                  새로운 태스크
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="taskName"
                  name="taskName"
                  fullWidth
                  id="taskName"
                  label="태스크 이름"
                  autoFocus
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
                  getDeadlineValue={getDeadlineValue}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">태스크 상태</FormLabel>
                <RadioGroup value={status} onChange={handleStatusChange} row>
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="진행 전"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="진행 중"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="완료"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Box paddingTop="12px" paddingBottom="12px">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                만들기
              </Button>
            </Box>
          </form>
        </div>
      </Container>
    </>
  );
};
export default TaskCreateForm;
