import React from 'react';
import {Grid,Paper,Typography} from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


const VideoItem = ({video , handleVideoSelect}) => {

    if(!video)  return <div></div>
    const VideoSrc= `https://www.youtube.com/embed/${video.id.videoId}`
    
    return (
       
        <Card  >
             {/* <CardMedia width="100%" height="100%" > */}
              <iframe src={VideoSrc}/>
             {/* </CardMedia> */}
            
            <CardContent>
                <Typography gutterBottom variant="body2" color="text.secondary">
                 {video.snippet.title}
                </Typography>
            </CardContent>
           
          
        </Card>
     
    )
};
export default VideoItem;