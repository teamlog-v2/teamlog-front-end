import React, { useRef, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import Attachment from '@material-ui/icons/Attachment';
import { isValidSize } from '../utils';

const AttachUploader = ({ files, updateFiles }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    const uploadedFiles = [...event.target.files];
    const newFiles = [...files];
    if (!isValidSize(files, uploadedFiles, 10000)) {
      alert('첨부파일 최대 용량은 10MB 입니다.');
      return;
    }
    let cnt = 0;

    [...event.target.files].forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onloadstart = () => {
        if (cnt === 0) {
          setIsUploading(true);
        }
      };

      fileReader.onloadend = () => {
        newFiles.push(file);
        cnt += 1;
        if (uploadedFiles.length === cnt) {
          setIsUploading(false);
          updateFiles(newFiles);
        }
      };
      fileReader.readAsDataURL(file);
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Grid item>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleButtonClick}
        disabled={isUploading}
        style={{ width: '160px', textAlign: 'center' }}
      >
        <Attachment fontSize="medium" />
        &nbsp;
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
