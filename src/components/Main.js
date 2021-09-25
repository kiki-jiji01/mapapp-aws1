import React,{useState,useEffect} from 'react';
import Search from "./Search";
import Map from "./Map";
import Video from "./Video";
import Sns from "./Sns";
import styled from "styled-components"

function Main (){


    const [Post,setPost] = useState([]);
    const [Caption,setCaption] = useState([]);
        useEffect(() => {
            fetch("https://graph.facebook.com/17841564013123618/top_media?user_id=17841411766795081&fields=id,media_url,caption,permalink,media_type,comments_count,like_count&access_token=EAA9mxzmBApoBANQKYIlJnl0iLdewqw10sROg4d9IOWZAulfN0JkeMp6jMB4JH4pkYzUVJXuVyzRgBWmqlGCUaN3OyZBXq6ZAwyZBj4vFkoZBOeNUaVJH397z1uiRWVe8IOsrkeEGeQTMHMxzZBaG59peUnJiTKZCPgQzjXnbHSNJhj4h4PtjtqD")
              .then((response) => response.json())
              .then((response) => {
              
                console.log(response.data[0].media_url)
                setPost(response.data[0].media_url);
                setCaption(response.data[0].caption);
              });
               
            //   .then((data) => {
            //         const image = data.caption
            //         const caption = data[0]
            //       });
            
          }, 
          
         
          []);

        return(
         <MainWrapper> 
            <TopWrapper>
             <Search/>
            </TopWrapper>
            <MiddleWrapper>
             <Map/>
            </MiddleWrapper>
            <BottomWrapper>
             <Sns Post={Post} Caption={Caption}/> 
            </BottomWrapper>
            
         </MainWrapper>
        );
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