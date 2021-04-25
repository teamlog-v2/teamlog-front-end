import React, { useRef } from 'react';
import {
  Grid,
  Chip,
} from '@material-ui/core';

const HashtagChooser = ({ hashtags, selectedTags, updateSelectedTags }) => {
  const chipRef = useRef(null);

  const handleChipClick = (index) => {
    let newSelectedTags = [...selectedTags];
    if ([...selectedTags].includes(index)) {
      newSelectedTags = [...selectedTags].filter((value) => index !== value);
    } else {
      newSelectedTags.push(index);
    }
    updateSelectedTags(newSelectedTags);
  };

  return (
    <Grid container direction="row" spacing={1}>
      {hashtags.map((item, index) => (
        <Grid item>
          <Chip
            ref={chipRef}
            key={index}
            label={`#${item}`}
            variant={selectedTags.includes(index) ? 'default' : 'outlined'}
            onClick={() => {
              handleChipClick(index);
            }}
            color="primary"
          />
        </Grid>
        ))}
    </Grid>
  );
};

export default HashtagChooser;
