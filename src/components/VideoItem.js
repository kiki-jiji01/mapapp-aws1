import React from 'react';
import {Grid,Paper,Typography} from '@material-ui/core';


const VideoItem = ({video , handleVideoSelect}) => {
    return (
        <Grid item xs={12}>
        <Paper style={{display: 'flex', alighItems: 'center', cursor: 'pointer'}} onClick={ () => handleVideoSelect(video)}>
         <img style={{marginRight : '20px'}} alt="thumbnails" src={video.snippet.thumbnails.medium.url}/>
   
         <Typography variant="subtitle1"><b>{video.snippet.title}</b></Typography>
        </Paper>
       </Grid>
    )
};
export default VideoItem;