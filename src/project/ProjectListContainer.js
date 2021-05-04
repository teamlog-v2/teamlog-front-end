/* eslint-disable no-param-reassign */

import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import ProjectItem from './ProjectItem';
// thumbnail: 'https://images.unsplash.com/photo-1617892459113-0ef697cafa05?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
// thumbnail: 'https://images.unsplash.com/photo-1617143777034-fe4c261ac738?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
// thumbnail: 'https://images.unsplash.com/photo-1616098851246-fc12488ffe97?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
// thumbnail: 'https://images.unsplash.com/photo-1616160973030-bb351a6a021e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
// thumbnail: 'https://source.unsplash.com/random',

const ProjectListContainer = ({ userId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      let result;
      try {
        console.log(userId);
        const response = await fetch(`/api/projects/user/${userId}`, {
          method: 'Get',
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response.status);
        result = await response.json();
      } catch (error) {
        setIsLoaded(false);
        return;
      }
      console.log(result);
      setProjects(result);
      setIsLoaded(true);
    })();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {(isLoaded ? projects : Array.from(new Array(8))).map((project) => (
          <Grid item md={4} sm={6} xs={12}>
            {project ? (
              <ProjectItem project={project} />
            ) : (
              <Box>
                <Skeleton variant="rect" height="150px" />
                <Box>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default ProjectListContainer;
