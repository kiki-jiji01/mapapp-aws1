import React from "react";
import Search from "./Search";
import Map from "./Map";
import Video from "./Video";
import Sns from "./Sns";
import styled from "styled-components"

class Main extends React.Component{
    render(){
        return(
         <MainWrapper> 
            <TopWrapper>
             <Search/>
            </TopWrapper>
            <MiddleWrapper>
             <Map/>
            </MiddleWrapper>
            {/* <BottomWrapper>
             <Video/>
            </BottomWrapper> */}
            <Sns/>
         </MainWrapper>
        );
    }
}

export default Main;



const MainWrapper = styled.div`




`

const TopWrapper = styled.div`
height: 30vh;
position: relative;
background: url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60")center center;

`

const MiddleWrapper = styled.div`
height: 200vh;
position: relative;



`

const BottomWrapper = styled.div`
top: 10vh;
height: 80vh;
position: relative;


`