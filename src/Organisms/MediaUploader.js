import React, { useEffect, useRef, useState } from 'react';
import {
  Grid,
  Button,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const MediaUploader = ({ files, updateFiles }) => {
  const [isUploading, setIsUploading] = useState(false);
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
    const loadedFilesLength = [...event.target.files].length;
    if ([...files].length + loadedFilesLength > 10) {
      alert('미디어 파일은 최대 10개까지 업로드 가능합니다.');
      return;
    }
    const fileWithThumbnail = [];
    let newFiles = [...files];

    setIsUploading(true);
    let cnt = 0;

    [...event.target.files].forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onprogress = () => { // 비동기
        console.log('progress..');
      };

      fileReader.onabort = () => {
        console.log('abort');
      };

      fileReader.onloadstart = () => {
        console.log('load start');
      };

      fileReader.onloadend = () => {
        console.log('load end');
        console.log(fileReader.result);

        fileWithThumbnail.push({
          url: URL.createObjectURL(file), // 일시적 URL
          file,
          type: getTypeofFile(file.name),
          base64: fileReader.result,
        });
        cnt += 1;
        if (loadedFilesLength === cnt) {
          setIsUploading(false);
          newFiles = newFiles.concat(fileWithThumbnail);
          updateFiles(newFiles);
        }
      };
      // 바이트 배열로 변환해서 서버에 저장.
      // base64 인코딩 // 안전한 문자임!
      fileReader.readAsDataURL(file); // 동기
      console.log('read');
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    console.log('렌더링 완료');
  }, [isUploading]);

  return (
    <Grid item>
      <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={isUploading}>
        <PhotoCamera fontSize="large" />
        <strong>사진 / 동영상</strong>
      </Button>
      <input
        id="media-upload"
        type="file"
        multiple
        ref={fileInputRef}
        accept='"image/*,video/*"' // 모바일 필터링 ?
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
    </Grid>
    );
};

export default MediaUploader;
