import React from 'react';
import VideoItem from './VideoItem';
import {Grid} from '@material-ui/core';

const VideoList = ({videos , handleVideoSelect}) => {

    if(!videos)  return <div></div>

    const renderedVideos =  videos.map((video) => {
        return <VideoItem  video={video} handleVideoSelect={handleVideoSelect} />
        // console.log(video.id);
    });

    return (
    <div> {renderedVideos}</div>
   
    
    )
};
export default VideoList;