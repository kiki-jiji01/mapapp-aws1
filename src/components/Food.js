import React from 'react';
import { Border, CityContentWrapper, CityContentWrapper1, CityContentWrapper2, CityTitleWrapper1, CityTitleWrapper2, VideoImageWrapper, VideoImageWrapper1, VideoImageWrapper2, VideoItemsWrapper, VideoItemsWrapper1, VideoWrapper } from './City';
import VideoList from './VideoList';
import styled from "styled-components"



function Food ({videos}){

        return(
            <div>
            <FoodTitleWrapper>
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
                  <Border></Border>
                </FoodContentWrapper2> 
              </FoodContentWrapper1> 
            </FoodContentWrapper>
      
            <VideoWrapper>
              <VideoImageWrapper>
                <VideoImageWrapper1>
                  <h3>Food</h3>
                <VideoImageWrapper2>
                  <img src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxmb29kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" height="440vh" width="330vw" />
                </VideoImageWrapper2>
                  <p>Cityscape is one of the important elements for living there.
                    You can feel the city you find here. </p>
                </VideoImageWrapper1>
              </VideoImageWrapper>
              <VideoItemsWrapper>
                <VideoItemsWrapper1>
                  <VideoList  videos={videos} />
                </VideoItemsWrapper1>
              </VideoItemsWrapper>
        　　</VideoWrapper>
          </div>
        );
    }


export default Food;

const FoodTitleWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;
`

const FoodTitleWrapper1 = styled(CityTitleWrapper1)`
`


const FoodTitleWrapper2 = styled(CityTitleWrapper2)`
`


const FoodContentWrapper= styled(CityContentWrapper)`
`

const FoodContentWrapper1= styled(CityContentWrapper1)`
`

const FoodContentWrapper2= styled(CityContentWrapper2)`
`

