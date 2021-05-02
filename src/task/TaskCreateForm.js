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
} from '@material-ui/core';
import MultiTimePicker from './MultiTimePicker';
import { createTask } from './taskService';

const TaskCreateForm = ({ projectId, addTaskInContainer }) => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('0');
  const [deadline, setDeadline] = useState(new Date());

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
    const data = {
      taskName,
      deadline,
      status,
    };
    try {
      const response = await createTask(projectId, data);
      const res = await response.json();
      console.log(res);
      addTaskInContainer(data);
    } catch (err) {
      console.error('Error');
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div>
          <form onSubmit={handleSubmit} noValidate>
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
                  required
                  fullWidth
                  id="taskName"
                  label="태스크 이름"
                  autoFocus
                  onChange={handleTaskNameChange}
                />
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
