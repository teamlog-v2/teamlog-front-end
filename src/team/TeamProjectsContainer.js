/* eslint-disable no-param-reassign */

import { Box, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useRef, useState } from 'react';
import ProjectItem from '../project/ProjectItem';
import { GetTeamProjects } from './TeamApi';
// thumbnail: 'https://images.unsplash.com/photo-1617892459113-0ef697cafa05?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
// thumbnail: 'https://images.unsplash.com/photo-1617143777034-fe4c261ac738?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
// thumbnail: 'https://images.unsplash.com/photo-1616098851246-fc12488ffe97?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
// thumbnail: 'https://images.unsplash.com/photo-1616160973030-bb351a6a021e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
// thumbnail: 'https://source.unsplash.com/random',

const SearchForm = (props) => {
  const { value, setValue, projects, setSearchResult, setIsLoaded } = props;

  const onChange = (e) => {
    setIsLoaded(false);
    setValue(e.currentTarget.value);
    const filteredProjects = projects.filter(
      (project) => project.name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1,
      );
    setSearchResult(filteredProjects);
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
  };

  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder="검색어를 입력하세요"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search style={{ fontSize: '1.5rem' }} />
          </InputAdornment>
        ),
        style: {
          fontSize: '1rem',
        },
      }}
      autoFocus
      variant="outlined"
      // inputRef={ref}
    />
  );
};

const TeamProjectsContainer = ({ teamId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [value, setValue] = useState('');
  // const ref = useRef(null);

  useEffect(() => {
    (async () => {
      let result;
      try {
        const response = await GetTeamProjects(teamId);
        result = await response.json();
      } catch (error) {
        setIsLoaded(false);
        return;
      }
      console.log(result);
      setProjects(result);
      setSearchResult(result);
      setIsLoaded(true);
    })();
  }, []);

  return (
    <>
      <Grid item style={{ margin: '1em 0' }} xs={6}>
        <Typography variant="h6">📂 팀 프로젝트</Typography>
      </Grid>
      <Grid item style={{ textAlign: 'right' }} xs={6}>
        <SearchForm
          value={value}
          setValue={setValue}
          projects={projects}
          setSearchResult={setSearchResult}
          setIsLoaded={setIsLoaded}
        />
      </Grid>
      <Grid container spacing={2} style={{ marginTop: '1em' }}>
        { isLoaded ?
      (
        <>
          {searchResult.length > 0 ?
            searchResult.map((project) => (
              <Grid item md={4} sm={6} xs={12}>
                <ProjectItem project={project} />
              </Grid>
            ))
            :
            (
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: '50vh' }}
              >
                {(value === '') ?
                (<Typography> 아직 생성한 프로젝트가 없어요. 😢 </Typography>) :
                (<Typography> 검색 결과가 없습니다. </Typography>)}
              </Grid>
            )}
        </>
      )
      :
      Array.from(new Array(8)).map(() => (
        <Grid item md={4} sm={6} xs={12}>
          <Box>
            <Skeleton variant="rect" height="150px" />
            <Box>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
        ))}
      </Grid>
    </>
  );
};
export default TeamProjectsContainer;
