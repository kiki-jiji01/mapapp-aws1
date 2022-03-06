import React from 'react';
import styled from "styled-components"

const VideoItem = ({video}) => {

    if(!video)  return <div></div>

    //  create the youtube url using data 
    const VideoSrc= `https://www.youtube.com/embed/${video.id.videoId}`
    
    return (
       <VideoCardWrapper> 
            <iframe 
            src={VideoSrc} 
            style={{ display: "block", width: "100%",height: "auto"}}
            />
            <p>{video.snippet.title}</p>
       </VideoCardWrapper>
       
     
    )
};
export default VideoItem;


const VideoCardWrapper = styled.div`
width: calc((100% - 60px) / 2);
margin-bottom: 30px;
box-sizing: border-box;
overflow: hidden;
`




