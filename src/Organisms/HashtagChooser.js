import React, { useEffect } from 'react';
import {
  Grid,
  Chip,
} from '@material-ui/core';

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
      item.style.backgroundColor = '#C16AF5';
      item.style.color = 'white';
    } else {
      item.style.backgroundColor = 'white';
      item.style.color = '#C16AF5';
    }
  };

  useEffect(() => {
    const item = document.querySelector('.tags');
    item.style.backgroundColor = '#C16AF5';
    item.style.color = 'white';
  }, []);

  return (
    <Grid container direction="row" spacing={1}>
      {hashtags.map((item, index) => (
        <Grid item>
          <Chip
            className="tags"
            key={index}
            label={`#${item}`}
            variant="outlined"
            onClick={() => {
              handleChipClick(index);
              handleToggle(index);
            }}
            color="primary"
          />
        </Grid>
        ))}
    </Grid>
  );
};

export default HashtagChooser;
