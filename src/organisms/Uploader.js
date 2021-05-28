import React, { useEffect, useRef, useState } from 'react';
import { Grid, Button, Tooltip } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Attachment from '@material-ui/icons/Attachment';
import { detectSupportFormat, isValidSize } from '../utils';

const Uploader = ({ attachedFiles, updateAttachedFiles,
  mediaFiles, updateMediaFiles }) => {
  const [isUploading, setIsUploading] = useState(false);
  const attachedInputRef = useRef(null);
  const mediaInputRef = useRef(null);

  const handleAttachedInputChange = (event) => {
    const uploadedFiles = [...event.target.files];
    if (!isValidSize(attachedFiles, uploadedFiles, 10000)) {
      alert('첨부파일 최대 용량은 10MB 입니다.');
      return;
    }
    let cnt = 0;

    const newFiles = [...attachedFiles];

    uploadedFiles.forEach((file) => { // fileReader 동기로?
      const fileReader = new FileReader();
      fileReader.onloadstart = () => {
        if (cnt === 0) {
          setIsUploading(true);
        }
      };

      fileReader.onloadend = () => {
        newFiles.push({ file });
        cnt += 1;
        if (uploadedFiles.length === cnt) {
          setIsUploading(false);
          updateAttachedFiles(newFiles);
        }
      };
      fileReader.readAsDataURL(file);
    });
  };

  const getTypeofFile = (type) => {
    if (type.includes('video')) return 'VIDEO';
    return 'IMAGE';
  };

  const handleMediaInputChange = async (event) => { // click trigger
    const uploadedFiles = [...event.target.files];

    const loadedFilesLength = uploadedFiles.length;
    if ([...mediaFiles].length + loadedFilesLength > 10) {
      alert('사진 및 동영상은 최대 10개까지 업로드 가능합니다.');
      return;
    }

    let newFiles = [...mediaFiles];

    if (!isValidSize(mediaFiles, uploadedFiles, 200000)) { // 동영상은 얼마나 압축하는게 좋을까요
      alert('첨부파일 최대 용량은 200MB 입니다.');
      return;
    }

    const fileWithThumbnail = await Promise.all([...event.target.files].map(async (file) => {
      if (file.type.includes('video')) {
          const url = URL.createObjectURL(file);
          const notSupportedFormat = await detectSupportFormat(url);

        return {
          url,
          file,
          type: getTypeofFile(file.type),
          notSupportedFormat,
        };
      }
      return {
        url: URL.createObjectURL(file), // 일시적 URL
        file,
        type: getTypeofFile(file.type),
      };
    }));
    newFiles = newFiles.concat(fileWithThumbnail);
    updateMediaFiles(newFiles);
  };

  const handleAttachedButtonClick = () => {
    attachedInputRef.current.click();
  };

  const handleMediaButtonClick = () => {
    mediaInputRef.current.click();
  };

  return (
    <Grid item>
      <Grid item container xs={12} direction="row">
        <Tooltip title="첨부파일 추가">
          <Button
            size="large"
            onClick={handleAttachedButtonClick}
            disabled={isUploading}
          >
            <Attachment fontSize="medium" />
          </Button>
        </Tooltip>
        <Tooltip title="사진/동영상 추가">
          <Button
            size="large"
            onClick={handleMediaButtonClick}
          >
            <PhotoCamera fontSize="medium" />
          </Button>
        </Tooltip>
      </Grid>
      <input
        id="attachment-upload"
        type="file"
        multiple
        ref={attachedInputRef}
        style={{ display: 'none' }}
        onChange={handleAttachedInputChange}
      />
      <input
        id="media-upload"
        type="file"
        multiple
        ref={mediaInputRef}
        accept="image/*, video/*" // 모바일 필터링 ?
        style={{ display: 'none' }}
        onChange={handleMediaInputChange}
      />
    </Grid>
  );
};

export default Uploader;
