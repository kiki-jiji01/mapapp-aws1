import React from 'react';
import styled from "styled-components"

const VideoItem = ({video}) => {

    if(!video)  return <div></div>

    //  create the youtube url using data 
    const VideoSrc= `https://www.youtube.com/embed/${video.id.videoId}`
    
    return (
       <VideoCardWrapper> 
         <VideoCardWrapper1> 
            
              <iframe src={VideoSrc} />
           
                
                 {video.snippet.title}
               
            
         </VideoCardWrapper1> 
       </VideoCardWrapper>
       
     
    )
};
export default VideoItem;

const VideoCardWrapper = styled.div`
width: 50%;
margin-bottom: 60px;
box-sizing: border-box;

`

const VideoCardWrapper1 = styled.div`
width:80%;         


`




