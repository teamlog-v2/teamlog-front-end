import React from 'react';
import {
  Grid
} from '@material-ui/core';
  
const MediaUploader = ({ files, updateFiles }) => {
  const getTypeofFile = (name) => {
    const token = name.split('.');
    const extension = token[token.length - 1];
    // split해서 확장자 필터링하는 것 보다
    // 버튼을 다르게 둬서
    // javascript accept활용해서 사진/동영상 구분
    if (extension === 'mp4') {
      return 'video';
    }
    return 'image';
  }

  return (
    <Grid item>
      <label htmlFor="media-upload"
      style={{ backgroundColor: 'black', color: 'white',
      padding: '1%', cursor: 'pointer' }}>
        사진/동영상
      </label>
      <input id="media-upload" type="file" multiple
        accept="image/*,video/*"
        style={{ display: 'none' }}
        onChange={(event) => {
          if (files.length === 10) {
            alert('미디어 파일은 최대 10개까지 업로드 가능합니다.');
            return;
          }
          const fileWithType = [...event.target.files].map((file) => {
                                  return ({ url: URL.createObjectURL(file),
                                      type: getTypeofFile(file.name),
                                    });
                                  }); // 일시적 file url
          const newFiles = [...files].concat(fileWithType);
          updateFiles(newFiles); }}/>
    </Grid>);
};

export default MediaUploader;