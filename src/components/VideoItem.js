import React from 'react';
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
width:80%;         


`




