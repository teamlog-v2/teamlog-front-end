import { Box, Button, Container, Dialog, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ProjectModifier from '../organisms/ProjectModifier';
import MasterSelect from './masterSelect';

const ProjectForm = ({ project }) => {
    const [selectedMaster, setSelectedMaster] = useState([project.masterId]); // 선택된 마스터
    const [openUserSelect, setopenUserSelect] = useState(false); // 마스터 선택 폼 띄울지 여부
    const [isProjectPublic, setIsProjectPublic] = useState(false); // 프로젝트 공개 여부 결정
    const [input, setInput] = useState({
      nameInput: project.name,
      introductionInput: project.introduction,
    });

    const handleClickOpen = () => {
      setopenUserSelect(true);
    };

    const handleUserSelectClose = () => {
      setopenUserSelect(false);
    };

    const onNameChange = (e) => {
        setInput({ ...input, nameInput: e.currentTarget.value });
    };

    const onIntroductionChange = (e) => {
        setInput({ ...input, introductionInput: e.currentTarget.value });
    };

    return (
      <Container style={{ minWidth: '30em', height: '30em' }}>
        <Grid container>
          <Grid container direction="column">
            <Grid container item alignItems="flex-end">
              <Grid item xs={6} style={{ margin: '2em 0' }}>
                <TextField
                  name="projectName"
                  fullWidth
                  id="projectName"
                  label="프로젝트 이름"
                  value={input.nameInput}
                  onChange={onNameChange}
                />
              </Grid>
              <Grid item xs={6} style={{ margin: '2em 0' }} justify="center">
                <ProjectModifier
                  isPostPublic={isProjectPublic}
                  updateIsPostPublic={setIsProjectPublic}
                />
              </Grid>
            </Grid>
            <Grid item style={{ margin: '1em 0 2em 0' }}>
              <TextField
                name="projectIntroduction"
                variant="outlined"
                fullWidth
                id="projectIntroduction"
                label="프로젝트 소개"
                multiline
                value={input.introductionInput}
                onChange={onIntroductionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems="flex-end">
                <Grid item xs={6}>
                  <TextField
                    name="projectName"
                    fullWidth
                    id="projectName"
                    label="마스터"
                    disabled
                    value={selectedMaster}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    size="small"
                  >

                    마스터 변경
                  </Button>
                </Grid>
              </Grid>
              <Dialog open={openUserSelect}>
                <MasterSelect
                  projectId={1343} // 임시로 정한거. 나중에 변경 필요
                  selectedUsers={selectedMaster}
                  setSelectedUsers={setSelectedMaster}
                  handleClose={handleUserSelectClose}
                />
              </Dialog>
            </Grid>
            <Grid container item spacing={1} style={{ margin: '2em 0' }}>
              <Grid item xs={6}>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    확인
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    취소
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Container>
    );
};

export default ProjectForm;
