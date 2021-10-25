import React,{useState,useEffect} from 'react';
import Search from "./Search";
import Map from "./Map";
import Video from "./Video";
import Sns from "./Sns";
import styled from "styled-components"


function Main (){


    const [Post,setPost] = useState([]);
    const [Caption,setCaption] = useState([]);
       
    // me?fields=accounts{name,instagram_business_account,access_token}

        useEffect(() => {
            fetch("https://graph.facebook.com/17841564013123618/top_media?user_id=17841411766795081&fields=id,media_url,caption,permalink,media_type,comments_count,like_count&access_token=EAA9mxzmBApoBAF3Urp4ZCSsSm6E5t0oSCVWpzPg7rmuZAbV6AzhIQcQrw1c4kXuK37TAlfINHxGQe4YQgTZB51zuBSpg5OeDxk9Pb5ekWmHvAq2IytvghmJZBWz1LhmL2pH1wxMEkLw07dutPnItrobUMwPuF8hoLuMvKITVlgRSoS0q5ZB7h")
              .then((response) => response.json())


              .then((response) => {
                console.log(response)
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
            {/* <BottomWrapper>
             <Sns Post={Post} Caption={Caption}/> 
            </BottomWrapper>
             */}
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
background-color: rgba(0, 0, 0, 0.9);
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