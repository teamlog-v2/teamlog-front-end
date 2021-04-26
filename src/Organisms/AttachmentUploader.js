import React, { useRef } from 'react';
import {
  Grid,
  Button,
} from '@material-ui/core';
import Attachment from '@material-ui/icons/Attachment';

const AttachUploader = ({ files, updateFiles }) => {
  const fileInputRef = useRef(null);

  const isValidSize = (newFiles) => {
    let totalSize = 0;
    files.forEach(({ size }) => {
      totalSize += size / 1000;
    });
    newFiles.forEach(({ size }) => {
      totalSize += size / 1000;
    });
    console.log(totalSize);
    return totalSize <= 10000;
  };

  const handleInputChange = (event) => {
    let newFiles = [...event.target.files];
    if (!isValidSize(newFiles)) {
      alert('첨부파일 최대 용량은 10MB 입니다.');
      return;
    }
    newFiles = [...files].concat(newFiles);
    updateFiles(newFiles);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Grid item>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        <Attachment fontSize="large" />
        <strong>첨부파일</strong>
      </Button>
      <input
        id="attachment-upload"
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
    </Grid>
    );
};

export default AttachUploader;
