import React, { useRef } from 'react';
import {
  Grid,
  Button,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { isValidSize } from '../utils';

const MediaUploader = ({ files, updateFiles }) => {
  const fileInputRef = useRef(null);

  const getTypeofFile = (name) => {
    const token = name.split('.');
    const extension = token[token.length - 1];
    if (extension === 'mp4') {
      return 'VIDEO';
    }
    return 'IMAGE';
  };

  const handleInputChange = (event) => { // click trigger
    const uploadedFiles = [...event.target.files];
    const loadedFilesLength = uploadedFiles.length;
    if ([...files].length + loadedFilesLength > 10) {
      alert('사진 및 동영상은 최대 10개까지 업로드 가능합니다.');
      return;
    }

    // 용량도
    const fileWithThumbnail = [];
    let newFiles = [...files];

    if (!isValidSize(files, uploadedFiles, 200000)) { // 동영상은 얼마나 압축하는게 좋을까요
      alert('첨부파일 최대 용량은 200MB 입니다.');
      return;
    }

    [...event.target.files].forEach((file) => {
      fileWithThumbnail.push({
        url: URL.createObjectURL(file), // 일시적 URL
        file,
        type: getTypeofFile(file.name),
      });
    });
    newFiles = newFiles.concat(fileWithThumbnail);
    updateFiles(newFiles);
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
        style={{ width: '160px', textAlign: 'center' }}
      >
        <PhotoCamera fontSize="medium" />
        &nbsp;
        <strong>사진 / 동영상</strong>
      </Button>
      <input
        id="media-upload"
        type="file"
        multiple
        ref={fileInputRef}
        accept="image/*, video/*" // 모바일 필터링 ?
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
      <span>사진 및 동영상은 최대 10개까지 업로드 가능합니다.</span>
    </Grid>
    );
};

export default MediaUploader;
