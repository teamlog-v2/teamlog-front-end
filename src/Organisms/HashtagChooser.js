import React, { useState, useEffect } from 'react';
import {
  Grid,
  Chip,
} from '@material-ui/core';

const HashtagChooser = ({ hashtags, selectedTags, updateSelectedTags }) => {
  const handleChipClick = (index) => {
    console.log('chip click');
    let newSelectedTags = [...selectedTags];
    if([...selectedTags].includes(index)) {
      newSelectedTags = [...selectedTags].filter((value) => index !== value);
    }
    else {
      newSelectedTags.push(index);
    }
    updateSelectedTags(newSelectedTags);
  }

return (<Grid container direction='row' spacing={1}>
    {hashtags.map((item, index) => (<Grid item>
      {
        selectedTags.includes(index)
          ? (<Chip key={index} label={`#${item}`}
          onClick={() => { handleChipClick(index); }} color='primary'/>)
          : (<Chip key={index} label={`#${item}`} variant='outlined'
          onClick={() => { handleChipClick(index); }} color='primary'/>)
      }
      </Grid>))}
    </Grid>);
};

export default HashtagChooser;
