import React from "react";
import styled from "styled-components"
import InstagramEmbed from 'react-instagram-embed'

class Top extends React.Component{
    render(){
        return(
         <Topwrapper> 
          
           <Banner>
            <h2>Map With</h2>
            <p>
            Where do you wanna live with your beatiful partner in the future?<br/>
            If you wish strong and strong, You can go everywhere you want.<br/> Let's start your dream here.
            </p>
           </Banner>
           
            
         </Topwrapper>
        );
    }
}

export default Top;


const Topwrapper = styled.div`
height: 150vh;
position: relative;
background: url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60")center center;

`

const Banner= styled.div`
background-color: black;
color: white;
padding-top: 25vh;
padding-left: 50px;
padding-right: 50px;
padding-bottom: 40px;
width:400px;

p{
    font-weight: 200;
    font-size: 18px;
}

`

