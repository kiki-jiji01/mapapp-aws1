import React from 'react';
import VideoList from './VideoList';
import styled from "styled-components"



function City ({videos}){

        return(
            <div>
            <CityTitleWrapper>
            　<CityTitleWrapper1>
                <CityTitleWrapper2>             
                    <h1>City</h1>          
                </CityTitleWrapper2> 
                </CityTitleWrapper1> 
            </CityTitleWrapper>
    
            <CityContentWrapper>
            　<CityContentWrapper1>
                <CityContentWrapper2>
                    <p>The cityscape remains in your heart forever.  </p>
                    <Border></Border>
                </CityContentWrapper2> 
                </CityContentWrapper1> 
            </CityContentWrapper>
    
            <VideoWrapper>
                <VideoImageWrapper>
                <VideoImageWrapper1>
                    <h3>City</h3>
                    <VideoImageWrapper2>
                    <img src="https://images.unsplash.com/photo-1523304867125-2293c498e08a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGxvbmRvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" height="440vh" width="330vw" />
                    </VideoImageWrapper2>
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


export default City;



export const CityTitleWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;
margin-top: 10vh;
`

export const CityTitleWrapper1 = styled.div`

margin-left: 30%;
margin-right: 30%;
position: relative;
padding: 0 12px;
`


export const CityTitleWrapper2 = styled.div`
margin-bottom: 5vh;
display: flex;
flex-direction: column;
align-items: center;

::before{
  content: '';
  height: 1px;
  margin-bottom: 1vh;
  width: 60%;
  background-color: black;
  display: block;
}

::after{
  margin-top: 1vh;
  width: 60%;
  content: '';
  height: 1px;
  display: block;
  background-color: #000;
}
`

export const CityContentWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;
`

export const CityContentWrapper1 = styled.div`

font-size: 24px;
margin-right: 60%;
position: relative;
padding: 0 48px;
`

export const CityContentWrapper2 = styled.div`

margin-bottom: 5vh;
display: flex;
flex-direction: column;
align-items: center;
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
display: flex;
justify-content: space-between;
margin-bottom: 20vh;
// margin-top: 20vh;
`


export const VideoImageWrapper = styled.div`
width: 50vw;
background-color: #F8F8F8;


p{
  margin-top: 10vh;
  width: 80%;
}
`

export const VideoImageWrapper1 = styled.div`
padding: 10% 5% 10% 10%;
display: flex;
text-align: center;
align-items: center;
flex-direction: column;
`

export const VideoImageWrapper2 = styled.div`

height: 100%;
object-fit: contain;
// background: url("https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
`

export const VideoItemsWrapper = styled.div`
width: 50vw;
background-color: white;
`

export const VideoItemsWrapper1 = styled.div`
margin-right: 32px;
margin-left: 32px;
width: 100%;
`
