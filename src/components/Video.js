import React from "react";
import { Grid } from '@material-ui/core';
import youtube from './youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import styled from "styled-components"
import VideoDetail from './VideoDetail';








class Video extends React.Component{


    state = {
        videos: [],
        selectedVideo: null,
       
    }


    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items
           
        })
        console.log("this is resp",response);
    };



    handleVideoSelect = (video) => {
        this.setState({
            selectedVideo: video
        })
    }

    

    render(){

       


        return(
            <VideoTopwrapper> 
            <SearchBar handleFormSubmit={this.handleSubmit}/>
            <Grid justify="center"  container spacing={10} className="grid">
                <Grid item xs={10}>
                 <Grid  container spacing={8}>

                  <Grid item xs={6}>
                   <VideoDetail video={this.state.selectedVideo}/>
                  </Grid>

                  <Grid item xs={4}>
                   <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos} />
                  </Grid>

                 </Grid>
                </Grid>
            </Grid>
            </VideoTopwrapper> 
        );
    }
}

export default Video;


const VideoTopwrapper = styled.div`
height: 30vh;
position: relative;

`