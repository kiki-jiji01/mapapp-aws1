import React from 'react';
import VideoItem from './VideoItem';
import {Grid} from '@material-ui/core';
import styled from "styled-components";


const VideoList = ({videos , handleVideoSelect}) => {

    if(!videos)  return <div></div>

    const renderedVideos =  videos.map((video) => {
        return <VideoItem  video={video} handleVideoSelect={handleVideoSelect} />
        // console.log(video.id);
    });

    return (
    <RenderVideo>{renderedVideos}</RenderVideo> 
   
    
    )
};
export default VideoList;

const RenderVideo = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
overflow: hidden;

`