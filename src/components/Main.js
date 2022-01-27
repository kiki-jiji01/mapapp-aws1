import React from 'react';
import Search from "./Search";
import Map from "./Map";
import styled from "styled-components"


function Main (){

        return(
         <MainWrapper> 
            {/* <TopWrapper>
             <Search />
            </TopWrapper> */}
            <MiddleWrapper>
             <Map/>
            </MiddleWrapper>
         </MainWrapper>
        );
    }


export default Main;



const MainWrapper = styled.div`

// height: 100%;
position: relative;
`

const TopWrapper = styled.div`
width: 100vw;
position: fixed;
background-color: rgba(0, 0, 0, .65);
z-index:200;
box-sizing: border-box;
padding: 15px 25px;
justify-content: center;
top: 0;
color: white;

`

const MiddleWrapper = styled.div`

position: absolute;
top:0;
width: 100vw;
box-sizing: border-box;

`

const BottomWrapper = styled.div`
// top: 310vh;
// height: 50vh;
// position: absolute;
// box-sizing: border-box;

`