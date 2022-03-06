import React from 'react';
import VideoItem from './VideoItem';
import styled from "styled-components";


function VideoList ({videos})  {

        if(!videos)  return <div></div>
        
        // pass video data to VideoItem component
        const renderedVideos =  videos.map((video) => {
            return <VideoItem  video={video}  />
        });

    return (
            
        <RenderVideoWrapper>
            {renderedVideos}
        </RenderVideoWrapper> 
   
    
    )
};
export default VideoList;

const RenderVideoWrapper = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
overflow: hidden;

`