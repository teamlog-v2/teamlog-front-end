import React from 'react';
import {
  Grid
} from '@material-ui/core';
  
const AttachUploader = ({ files, updateFiles }) => {
  const isValidSize = (newFiles) => {
    let totalSize = 0;
    files.forEach(({size}) => {
      totalSize += size / 1000;
    })
    newFiles.forEach(({size}) => {
      totalSize += size / 1000;
    })
    console.log(totalSize);
    return totalSize <= 10000;
  }

  return (
    <Grid item>
      <label htmlFor="attachment-upload"
      style={{ backgroundColor: 'black', color: 'white',
      padding: '1%', cursor: 'pointer' }}>
        첨부파일
      </label>
      <input id="attachment-upload" type="file" multiple
        style={{ display: 'none' }}
        onChange={(event) => {
              let newFiles = [...event.target.files];
              if(!isValidSize(newFiles)) {
                alert('첨부파일 최대 용량은 10MB 입니다.');
                return;
              }
              newFiles = [...files].concat(newFiles);
              updateFiles(newFiles);
            }
          }
      />
    </Grid>);
};

export default AttachUploader;