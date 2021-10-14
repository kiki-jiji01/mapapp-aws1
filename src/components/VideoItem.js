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
            {/* <Iframe> */}
              <iframe src={VideoSrc} />
            {/* </Iframe> */}
                
                 {video.snippet.title}
               
            
         </VideoCardInnner> 
       </VideoCard>
       
     
    )
};
export default VideoItem;

const VideoCard = styled.div`
width: 40%;
margin-bottom: 60px;

`

const VideoCardInnner = styled.div`
width:100%;              /*横幅いっぱいにwidthを指定*/
padding-bottom: 56.25%;  /*高さをpaddingで指定(16:9)*/
height:0px;              /*高さはpaddingで指定するためheightは0に*/
position: relative;

iframe{
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
`




