import React, { useRef } from 'react';
import {
  Grid,
  Button,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const MediaUploader = ({ files, updateFiles }) => { // 확인, 취소 버튼 누를 시?
  // const [isUploading, updateIsUploading] = useState(0);
  const fileInputRef = useRef(null);

  const getTypeofFile = (name) => {
    const token = name.split('.');
    const extension = token[token.length - 1];
    if (extension === 'mp4') {
      return 'video';
    }
    return 'image';
  };

  const handleInputChange = (event) => { // click trigger
    if ([...files].length + [...event.target.files].length > 10) {
      alert('미디어 파일은 최대 10개까지 업로드 가능합니다.');
      return;
    }

    const fileWithType = [...event.target.files].map((file) => ({ url: URL.createObjectURL(file),
                                type: getTypeofFile(file.name),
                              })); // 일시적 file url
    const newFiles = [...files].concat(fileWithType);
    updateFiles(newFiles);
    // if(isUploading) {
    //   updateIsUploading(0);
    // }
  };

  const handleButtonClick = () => {
    // updateIsUploading(1);
    fileInputRef.current.click();
  };

  return (
    <Grid item>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
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
