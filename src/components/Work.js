import React from 'react';
import { Border, CityContentWrapper, CityContentWrapper2, CityTitleWrapper1, CityTitleWrapper2, VideoImageWrapper, VideoImageWrapper1, VideoImageWrapper2, VideoItemsWrapper, VideoItemsWrapper1, VideoWrapper} from './City';
import VideoList from './VideoList';
import styled from "styled-components"



function Work ({videos}){

        return(
         <div>
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
                  <p>Working make someones's life more exiting. </p>
                  <Border></Border>
                </WorkContentWrapper2> 
              </WorkContentWrapper1> 
            </WorkContentWrapper>
            　　　　　　
            <VideoWrapper>
              <VideoItemsWrapper>
                <VideoItemsWrapper1>
                 <VideoList  videos={videos} />
                </VideoItemsWrapper1>
              </VideoItemsWrapper>
              <VideoImageWrapper>
                <VideoImageWrapper1>
                <h3>Work</h3>
                <VideoImageWrapper2>
                 <img src="https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjIyfHx3b3JraW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" height="440vh" width="330vw" />
                </VideoImageWrapper2>
                <p>Working is necessary elements in your life.<br/>
                    You can feel work style here. </p>
                </VideoImageWrapper1>
              </VideoImageWrapper>
            </VideoWrapper>
      
         </div>
        );
    }


export default Work;

const WorkTitleWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;
`

const WorkTitleWrapper1 = styled(CityTitleWrapper1)`
`

const WorkTitleWrapper2 = styled(CityTitleWrapper2)`
`

const WorkContentWrapper= styled(CityContentWrapper)`
`

const WorkContentWrapper1= styled.div`

font-size: 24px;
margin-left: 60%;
position: relative;
padding: 0 48px;
`

const WorkContentWrapper2= styled(CityContentWrapper2)`
`



