import { VideoCallRounded } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import jQuery from 'jquery';
import React, { useEffect, useState } from 'react';
import ResponsiveDialog from '../organisms/ResponsiveDialog';
import { convertResourceUrl, detectSupportFormat } from '../utils';

window.jQuery = jQuery;
window.$ = window.jQuery;

const useStyles = makeStyles(() => ({
  align: {
    margin: '0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    objectFit: 'contain',
    color: 'white',
  },
  compressed: {
    height: 400,
    backgroundColor: 'black',
    opacity: 0.9,
    color: 'white',
  }
}));

const CloseButton = ({ handleClick }) => (
  <span
    style={{ margin: '1%', color: 'white', float: 'right', cursor: 'pointer' }}
    onClick={handleClick}
  >
    닫기
  </span>
);

const Media = ({ file }) => {
  const { contentType } = file;
  // 확장자 판별
  if (contentType.includes('video')) {
    return <Video file={file} width="100%" />; //
  } if (contentType.includes('image')) {
    return <ImageContent file={file} />;
  }

  return <></>
};

const ImageContent = ({ file }) => {
  const { fileName, fileDownloadUri } = file;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (<>
    <Box width="100%" className={classes.align} onClick={() => { setOpen(true); }} style={{ cursor: 'pointer' }}>
      <img src={convertResourceUrl(fileDownloadUri)} width="100%" />
    </Box>
    <ResponsiveDialog open={open} updateOpen={setOpen} bgColor="black" max={"md"}>
      <div>
        <CloseButton handleClick={() => { setOpen(false); }} />
        <img src={convertResourceUrl(fileDownloadUri)} width="100%" />
      </div>
    </ResponsiveDialog>
  </>
  );
};

const Video = ({ file, compressed }) => {
  const { fileName, fileDownloadUri } = file;
  const [notSupportedFormat, setNotSupportedFormat] = useState(false);
  const [open, setOpen] = useState(false);
  const url = convertResourceUrl(fileDownloadUri);

  useEffect(async () => {
    const result = await detectSupportFormat(url);
    setNotSupportedFormat(result);
  }, []);

  const classes = useStyles();

  return notSupportedFormat ? (
    <Box>
      <Grid className={!compressed ? classes.align : classes.compressed}
        container xs={12}
        alignItems="center"
        justify="center"
        direction="column">
        <VideoCallRounded fontSize="large" />
        {fileName}
        <span style={{ opacity: 0.6, margin: '1%' }}>(브라우저에서 지원하지않는 형식입니다)</span>
      </Grid>
    </Box>
  ) : (<>
    <Box
      style={{ cursor: 'pointer' }}
      onClick={() => { setOpen(false); }}>
      <video className={!compressed ? classes.align : ''} autoPlay playsInline controls muted width="100%">
        <source src={convertResourceUrl(url)}></source>
      </video>
    </Box>
    <ResponsiveDialog open={open} updateOpen={setOpen} bgColor="black" max={"md"}>
      <div>
        <CloseButton handleClick={() => { setOpen(false); }} />
        <video controls muted width="100%">
          <source src={convertResourceUrl(url)}></source>
        </video>
      </div>
    </ResponsiveDialog>
  </>
  )
};

export { Media, Video };
