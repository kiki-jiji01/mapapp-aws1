import React from 'react';
import { Border, CityContentWrapper, CityContentWrapper1, CityContentWrapper2, CityTitleWrapper1, CityTitleWrapper2, VideoImageWrapper, VideoImageWrapper1, VideoImageWrapper2, VideoItemsWrapper, VideoItemsWrapper1, VideoWrapper } from './City';
import VideoList from './VideoList';
import styled from "styled-components"



function Food ({videos}){

        return(
          <FoodWrapper>
            <FoodTitleWrapper id='food'>
            　<FoodTitleWrapper1>
               <FoodTitleWrapper2>             
                  <h1>Food</h1>          
               </FoodTitleWrapper2> 
              </FoodTitleWrapper1> 
            </FoodTitleWrapper>
      
            <FoodContentWrapper>
            　<FoodContentWrapper1>
                <FoodContentWrapper2>
                  <p>To eat is to color your life.</p>
                </FoodContentWrapper2> 
              </FoodContentWrapper1> 
            </FoodContentWrapper>
      
            <FoodVideoWrapper>
              <VideoItemsWrapper>
                <VideoItemsWrapper1>
                  <VideoList  videos={videos} />
                </VideoItemsWrapper1>
              </VideoItemsWrapper>
         　　</FoodVideoWrapper>
          </FoodWrapper>
        );
    }


export default Food;

export const FoodWrapper= styled.div`

background-color:rgba(255,75,62,1.0);
margin-bottom: 10vh;
`

const FoodTitleWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;
padding-top: 15px;
color: white;
`

const FoodTitleWrapper1 = styled(CityTitleWrapper1)`
`


const FoodTitleWrapper2 = styled(CityTitleWrapper2)`
`


const FoodContentWrapper= styled(CityContentWrapper)`

padding-top: 15px;
`

const FoodContentWrapper1= styled(CityContentWrapper1)`
`

const FoodContentWrapper2= styled(CityContentWrapper2)`
`

const FoodVideoWrapper = styled(VideoWrapper)`

color: white;
background-color:rgba(255,75,62,0.7);

`
