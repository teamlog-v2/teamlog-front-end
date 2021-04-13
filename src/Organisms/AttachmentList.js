import React  from 'react';
import {
  Grid, Card
} from '@material-ui/core';
import Cancel from '@material-ui/icons/Cancel';

const AttachmentList = ({ files, updateFiles }) => {
 return <Grid container direction='column' spacing={2}>
   {files.map(({ name }, index) => (<Grid key={name} item>
     <div>
       <u>{name}</u>
       <Cancel style={{ cursor: 'pointer' }} onClick={() => {
         const newFiles = files.filter((e, i) => index !== i);
         updateFiles(newFiles); }}/>
    </div>
  </Grid>)
  )
}
  </Grid>
};

export default AttachmentList;
