import React from 'react';
import {Grid,Paper,Typography} from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import styled from "styled-components"

const VideoItem = ({video , handleVideoSelect}) => {

    if(!video)  return <div></div>
    const VideoSrc= `https://www.youtube.com/embed/${video.id.videoId}`
    
    return (
       <VideoCard> 
         <VideoCardInnner> 
            
              <iframe src={VideoSrc} />
           
                
                 {video.snippet.title}
               
            
         </VideoCardInnner> 
       </VideoCard>
       
     
    )
};
export default VideoItem;

const VideoCard = styled.div`
width: 50%;
margin-bottom: 60px;
box-sizing: border-box;

`

const VideoCardInnner = styled.div`
width:80%;              /*横幅いっぱいにwidthを指定*/


`




