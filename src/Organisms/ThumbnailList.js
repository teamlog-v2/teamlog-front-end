import React  from 'react';
import {
  Grid, Card, CardMedia
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel';

const ThumbnailList = ({ files, updateFiles }) => {

 return <Grid container direction='row' spacing={2}>
   {files.map(({url, type}, index) => (<Grid key={url} item style={{ width: '20%' }}>
     <Card>
       <IconButton onClick={() => {
         const newFiles = files.filter((e, i) => index !== i);
         updateFiles(newFiles);
        }}
        color='secondary'
       style={{ position: 'absolute', float: 'right', zIndex: 2 }}>
         <Cancel/>
       </IconButton>
       {type === 'video'
        ?  <CardMedia
        component="video"
        src={url}
        autoPlay
        control
        />
        : <CardMedia
        component="img"
        src={url}
      />}
      </Card>
    </Grid>)
  )
}
  </Grid>
};

export default ThumbnailList;
