import React, { useState, useEffect } from 'react';
import {
  Grid,
  Chip,
  Paper,
} from '@material-ui/core';
import HashtagChooser from './Organisms/HashtagChooser';
import postsMock from './mock/posts';

const mainHashtag = '스토리보드';

const ProjectPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [projectHashtags, setProjectHashtags] = useState([`${mainHashtag}`]);
  const [selectedTags, setSelectedTags] = useState([0]);

  const fetchPosts = (selected) => {
    console.log(projectHashtags[0]);
    const newPosts = postsMock.filter(({ hashtags }) => 
        selected.some((selectedIndex) => hashtags.includes(projectHashtags[selectedIndex])
      )
    )
    console.log(newPosts);
    setPosts(newPosts);
  }

  useEffect(() => { // 특정 프로젝트에 대해 모든 해시태그 값들 get
                    // @get('/post_hashtags/projectId')
    const initProjectHashtags = [];

    postsMock.forEach(({ hashtags }) => {
      hashtags.forEach((hashtag) => {
        if(!initProjectHashtags.includes(hashtag)) {
          initProjectHashtags.push(hashtag);
        }
      })
    });
    setIsLoaded(true);
    fetchPosts([0]); // 스토리보드
    setProjectHashtags(initProjectHashtags); // 똑같은 state라 하더라도 set을 하면
                                            // rerendring, effect가 반복해서 수행됨.
  }, []);

  return !isLoaded
    ? <div>loading...</div>
    : (<Grid container direction='column' spacing={3} alignItems='center' >
          <Grid item container direction='row' spacing={1} xs={6}>
            <HashtagChooser hashtags={projectHashtags}
            selectedTags={selectedTags}
            updateSelectedTags={(selected) => {
              setSelectedTags(selected);
              fetchPosts(selected);
            }}/>
          </Grid>
          <Grid item container direction='column' spacing={1} xs={6}>
            {
              posts.map(({id, content}) => 
                <Grid item key={id}>
                  <div style={{ backgroundColor: '#E6E6E6', padding: '1%' }}>
                    {content}
                  </div>
                </Grid>
              )
            }
          </Grid>
      </Grid>
      );

};

export default ProjectPage;
