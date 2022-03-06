import React from 'react';
import { Border, CityContentWrapper, CityContentWrapper1 , CityContentWrapper2, CityTitleWrapper1, CityTitleWrapper2, VideoImageWrapper, VideoImageWrapper1, VideoImageWrapper2, VideoItemsWrapper, VideoItemsWrapper1, VideoWrapper} from './City';
import VideoList from './VideoList';
import styled from "styled-components"


function Work ({videos}){

        return(
         <WorkWrapper>
            <WorkTitleWrapper id='work'>
              <WorkTitleWrapper1>
                <WorkTitleWrapper2>             
                  <h1>Work</h1>          
                </WorkTitleWrapper2> 
              </WorkTitleWrapper1> 
            </WorkTitleWrapper>

            <WorkContentWrapper>
              <WorkContentWrapper1>
                <WorkContentWrapper2>
                  <p>Working make <br/>someones's life more exiting. </p>
                </WorkContentWrapper2> 
              </WorkContentWrapper1> 
            </WorkContentWrapper>
            　　　　　　
            <WorkVideoWrapper>
              <VideoItemsWrapper>
                <VideoItemsWrapper1>
                 <VideoList  videos={videos} />
                </VideoItemsWrapper1>
              </VideoItemsWrapper>
            </WorkVideoWrapper>
        </WorkWrapper>
        );
    }


export default Work;



const WorkWrapper= styled.div`
background-color:rgba(34,51,59,1.0);
margin-bottom: 10vh;
`


const WorkTitleWrapper= styled.div`
position: relative;
padding-top: 15px;
margin-left: 32px;
margin-right: 32px;
color: white;
`

const WorkTitleWrapper1 = styled(CityTitleWrapper1)`
`

const WorkTitleWrapper2 = styled(CityTitleWrapper2)`
`

const WorkContentWrapper= styled(CityContentWrapper)`
padding-top: 15px;
`

const WorkContentWrapper1= styled(CityContentWrapper1)`

`

const WorkContentWrapper2= styled(CityContentWrapper2)`
`


const WorkVideoWrapper = styled(VideoWrapper)`
color: white;
background-color:rgba(34,51,59,0.7);
`


