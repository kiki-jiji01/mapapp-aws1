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
            fetch("https://graph.facebook.com/17841564013123618/top_media?user_id=17841411766795081&fields=id,media_url,caption,permalink,media_type,comments_count,like_count&access_token=EAA9mxzmBApoBAB5j504ycyfQrCqiu9TiiK1Y2ifAeWP1SyHRjcka9uDCHYQ27N3FRls7NutGEZBf6s9bv19zRbPKAs709oQSYHSkkITKu8aN5zSBVcaQwGYMiZAHPtOD2JzjY4bq7wZB7ooGDR5JSJoPymkP9CPIPHNFV2CBo3u60i48SaE")
              .then((response) => response.json())


              .then((response) => {
              
                console.log(response.data[0])
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
             <Search />
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

height: 100%;
position: relative;

`

const TopWrapper = styled.div`
width: 100vw;
height: 10vh;
position: fixed;
background-color: #fff;
z-index:10;
box-sizing: border-box;
`

const MiddleWrapper = styled.div`
height: 300vh;
position: absolute;
top:10vh;
width: 100vw;
box-sizing: border-box;

`

const BottomWrapper = styled.div`
top: 310vh;
height: 50vh;
position: absolute;
box-sizing: border-box;

`