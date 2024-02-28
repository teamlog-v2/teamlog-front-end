import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext, useState } from 'react';
import AccountSelect from '../account/AccountSelect';
import AuthContext from '../contexts/auth';
import { convertResourceUrl } from '../utils';
import MultiTimePicker from './MultiTimePicker';
import { CreateTaskNotification, createTask, putTask } from './taskService';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const getDate = (date) => {
  if (date) {
    const formattedDate = [...date];
    const month = date[1];
    formattedDate[1] = month - 1;
    return new Date(...formattedDate);
  }
  return null;
};

const TaskCreateForm = ({
  projectId,
  addTaskInContainer,
  handleClose,
  task,
  updateTask,
}) => {
  const classes = useStyles();
  const [taskName, setTaskName] = useState(task?.taskName ?? '');
  const [taskStatus, setTaskStatus] = useState(task?.status ?? 0);
  const [deadline, setDeadline] = useState(getDate(task?.deadline));
  const [selectedAccounts, setSelectedAccounts] = useState(task?.performers ?? []);
  const [openAccountSelect, setopenAccountSelect] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [accountId] = useContext(AuthContext);

  const handleClickOpen = () => {
    setopenAccountSelect(true);
  };
  const handleAccountSelectClose = () => {
    setopenAccountSelect(false);
  };

  const getDeadlineValue = (value) => {
    setDeadline(value);
  };

  const handleStatusChange = (event) => {
    setTaskStatus(event.target.value * 1);
  };
  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = async (event) => {
    // task 기존에 있었다면 update request
    setIsProcessing(true);
    event.preventDefault();
    const performersId = selectedAccounts.map(({ id }) => id);

    console.log(deadline);
    if (taskName.length === 0) {
      alert("태스크 이름을 1자 이상 입력해주세요.")
      setIsProcessing(false);
      return;
    }

    const data = {
      taskName,
      performersId,
      deadline,
      status: taskStatus,
    };

    console.log('updated data');
    console.log(data);

    try {
      let response;

      if (task) response = await putTask(task.id, data);
      else response = await createTask(projectId, data);

      if (task) {
        console.log('put');
      } else console.log('create');

      const { status } = response;
      const res = await response.json();

      console.log('수정 결과');
      console.log(res);

      if (status === 201) {
        addTaskInContainer(res);
        handleClose();
        CreateTaskNotification(accountId, projectId);
        console.log('ok');
      } else if (status === 200) {
        updateTask(res);
        handleClose();
      } else if (status === 400) {
        alert(res.message);
      } else {
        alert('실패');
      }
      setIsProcessing(false);
    } catch (err) {
      console.error('Error');
      setIsProcessing(false);
    }
  };

  const AddButton = ({ label, action }) => (
    <IconButton onClick={action}>
      <Avatar className={classes.small} style={{ backgroundColor: '#593875' }}>
        <AddIcon />
      </Avatar>
      <Typography variant="caption" style={{ color: 'black' }}>
        &nbsp;{label}
      </Typography>
    </IconButton>
  );

  const RemoveButton = ({ action }) => (
    <IconButton onClick={() => action()}>
      <Avatar className={classes.small} style={{ backgroundColor: '#593875' }}>
        <RemoveIcon />
      </Avatar>
      <Typography variant="caption" style={{ color: 'black' }}>
        &nbsp;삭제
      </Typography>
    </IconButton>
  );

  return (
    <>
      <Backdrop className={classes.backdrop} open={isProcessing}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="xs" style={{ margin: '3% 0' }}>
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <Dialog open={openAccountSelect}>
              <AccountSelect
                projectId={projectId}
                selectedAccounts={selectedAccounts.map(({ id }) => id)}
                setSelectedAccounts={setSelectedAccounts}
                handleClose={handleAccountSelectClose}
              />
            </Dialog>
            <Grid container style={{ gap: 20 }}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="taskName"
                  name="taskName"
                  fullWidth
                  id="taskName"
                  label="태스크 이름"
                  value={taskName}
                  onChange={handleTaskNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">진행 상태</FormLabel>
                <RadioGroup value={taskStatus} onChange={handleStatusChange} row>
                  <FormControlLabel
                    value={0}
                    control={<Radio color="primary" />}
                    label="진행 전"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio color="primary" />}
                    label="진행 중"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio color="primary" />}
                    label="완료"
                  />
                </RadioGroup>
              </Grid>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                {' '}
                <Grid
                  container
                  item
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      태스크 수행자
                    </Typography>
                  </Grid>
                  <Grid item>
                    {selectedAccounts.length === 0 ? (
                      <AddButton label="추가" action={handleClickOpen} />
                    ) : (
                      <>
                        <IconButton onClick={handleClickOpen}>
                          <Avatar
                            className={classes.small}
                            style={{
                              background: 'transparent',
                            }}
                          >
                            <EditTwoToneIcon color="primary" />
                          </Avatar>
                          <Typography
                            variant="caption"
                            style={{ color: 'black' }}
                          >
                            &nbsp;수정
                          </Typography>
                        </IconButton>
                      </>
                    )}
                  </Grid>
                  <Grid></Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleClickOpen}>
                    <Box display="flex" flexDirection="row">
                      {selectedAccounts.length === 0 ? (
                        <>
                          <Typography>😱없음😱</Typography>
                        </>
                      ) : (
                        <>
                          {selectedAccounts.length > 5 ? (
                            <>
                              {selectedAccounts.slice(0, 5).map((account) => (
                                <Box paddingLeft="5px" paddingRight="5px">
                                  <Avatar
                                    alt={account.name}
                                    src={convertResourceUrl(account.profileImgPath)}
                                  />
                                  <Typography variant="caption">
                                    {account.name}
                                  </Typography>
                                </Box>
                              ))}
                              <Box paddingLeft="5px" paddingRight="5px">
                                <Avatar>+{selectedAccounts.length - 5}</Avatar>
                              </Box>
                            </>
                          ) : (
                            <>
                              {selectedAccounts.map((account) => (
                                <Box paddingLeft="5px" paddingRight="5px">
                                  <Avatar
                                    alt={account.name}
                                    src={convertResourceUrl(account.profileImgPath)}
                                  />
                                  <Typography variant="caption">
                                    {account.name}
                                  </Typography>
                                </Box>
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </Box>
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                    >
                      마감일
                    </Typography>
                  </Grid>
                  <Grid item>
                    {deadline === null ? (
                      <AddButton
                        label="등록"
                        action={() => setDeadline(new Date())}
                      />
                    ) : (
                      <RemoveButton action={() => setDeadline(null)} />
                    )}
                  </Grid>
                </Grid>
                {deadline === null ? null : (
                  <MultiTimePicker
                    id="deadline"
                    name="deadline"
                    value={deadline}
                    getDeadlineValue={getDeadlineValue}
                  />
                )}
              </Grid>
            </Grid>
            <Box paddingTop="20px" paddingBottom="12px">
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
