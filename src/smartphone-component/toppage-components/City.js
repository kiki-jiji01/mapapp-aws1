import React from 'react';
import VideoList from './VideoList';
import styled from "styled-components"



function City ({videos}){

        return(
            
            <CityWrapper>
              <CityTitleWrapper id='city'>
              　<CityTitleWrapper1>
                  <CityTitleWrapper2>             
                      <h1>City</h1>          
                  </CityTitleWrapper2> 
                  </CityTitleWrapper1> 
              </CityTitleWrapper>
      
              <CityContentWrapper>
              　<CityContentWrapper1>
                  <CityContentWrapper2>
                      <p>The cityscape <br/> remains in your heart forever.  </p>
                  </CityContentWrapper2> 
                  </CityContentWrapper1> 
              </CityContentWrapper>
            

              <VideoWrapper>
                  <VideoItemsWrapper>
                    <VideoItemsWrapper1>
                      <VideoList  videos={videos} />
                    </VideoItemsWrapper1>
                  </VideoItemsWrapper>
              </VideoWrapper>
            </CityWrapper>
        );
    }


export default City;


export const CityWrapper= styled.div`
background-color:rgba(169,146,125,1.0);
margin-bottom: 10vh;
`

export const CityTitleWrapper= styled.div`
id="city"
position: relative;
margin-left: 32px;
margin-right: 32px;
color:  white;
`

export const CityTitleWrapper1 = styled.div`

position: relative;

`


export const CityTitleWrapper2 = styled.div`

font-size: 24px;
align-items: center;
`

export const CityContentWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;
color:  white;
margin-bottom: 5vh;
`

export const CityContentWrapper1 = styled.div`

font-size: 24px;
position: relative;
`

export const CityContentWrapper2 = styled.div`

line-height: 1.3;
margin-top: -3vh;
`

export const Border = styled.div`

height: 4px;
background-color: #000;
font-size: 0;
line-height: 0;
width: 10vw;
margin-top: 5%;
margin-left: -20%;
`

export const VideoWrapper = styled.div`

color: white;
background-color:rgba(169,146,125,0.7);

`

export const VideoItemsWrapper = styled.div`

`

export const VideoItemsWrapper1 = styled.div`
padding: 40px 20px 20px 20px;
width: 100%;
`
