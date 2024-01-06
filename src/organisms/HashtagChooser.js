import { Chip, Grid } from '@mui/material';
import React, { useEffect } from 'react';

const HashtagChooser = ({ hashtags, selectedTags, updateSelectedTags }) => {
  const handleChipClick = (index) => {
    let newSelectedTags = [...selectedTags];
    if ([...selectedTags].includes(index)) {
      newSelectedTags = [...selectedTags].filter((value) => index !== value);
    } else {
      newSelectedTags.push(index);
    }
    updateSelectedTags(newSelectedTags);
  };

  const handleToggle = (index) => {
    const item = document.querySelectorAll('.tags')[index];
    if (!selectedTags.includes(index)) {
      item.style.backgroundColor = '#593875';
      item.style.color = 'white';
    } else {
      item.style.backgroundColor = 'white';
      item.style.color = '#593875';
    }
  };

  useEffect(() => {
    const item = document.querySelectorAll('.tags');
    selectedTags.forEach((index) => {
      item[index].style.backgroundColor = '#593875';
      item[index].style.color = 'white';
    });
  }, []);

  return (
    <Grid container direction="row" spacing={1}>
      {hashtags.map((item, index) => (
        <Grid key={`ht-${index}`} item>
          <Chip
            className="tags"
            label={`#${item}`}
            variant="outlined"
            onClick={() => {
              handleChipClick(index);
              handleToggle(index);
            }}
            size="small"
            color="primary"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HashtagChooser;
