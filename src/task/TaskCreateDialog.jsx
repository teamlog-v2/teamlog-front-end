import React, { useState } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup,
  FormControlLabel, FormLabel
} from '@material-ui/core'
import MultiTimePicker from './MultiTimePicker'
import { createTask } from './TaskService'

const TaskCreateDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("0");
  const [deadline, setDeadline] = useState(new Date());

  const getDeadlineValue = (value) => { setDeadline(value); }

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const handleStatusChange = (event) => { setStatus(event.target.value); };
  const handleTaskNameChange = (event) => { setTaskName(event.target.value); };

  const create = () => {
    var data = {
      taskName: taskName,
      deadline: deadline,
      status: status
    };
    createTask(data)
      .then(res => res.json())
      .then(response => {
        props.addTaskInContainer(response);
        console.log('Success');
      })
      .catch(error => console.error('Error'));
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        + 태스크 생성
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">새로운 태스크</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="태스크 이름"
            onChange={handleTaskNameChange}
            fullWidth
          />
          <br /><br />
          <MultiTimePicker name="마감일" getDeadlineValue={getDeadlineValue} />
          <br /><br />
          <FormLabel component="legend">
            태스크 상태
          </FormLabel>
          <RadioGroup
            value={status}
            onChange={handleStatusChange}
            row
          >
            <FormControlLabel value="0" control={<Radio />} label="진행 전" />
            <FormControlLabel value="1" control={<Radio />} label="진행 중" />
            <FormControlLabel value="2" control={<Radio />} label="완료" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={create} color="primary">
            생성
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default TaskCreateDialog;