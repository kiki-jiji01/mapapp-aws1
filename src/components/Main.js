import React from 'react';
import Map from "./Map";
import styled from "styled-components"


function Main (){

        return(
         <MainWrapper> 
            <MainWrapper1>
             <Map/>
            </MainWrapper1>
         </MainWrapper>
        );
    }


export default Main;



const MainWrapper = styled.div`

// height: 100%;
position: relative;
`


const MainWrapper1 = styled.div`

position: absolute;
top:0;
width: 100vw;
box-sizing: border-box;

`
