import React,{useState,useEffect} from 'react';
import axios from "axios";
import styled from "styled-components"
// import InstagramEmbed from 'react-instagram-embed'
import { TwitterTimelineEmbed,TwitterHashtagButton} from 'react-twitter-embed';

class Sns extends React.Component{

  
    // const [Post,setPost] = useState([]);
    // const [Caption,setCaption] = useState([]);
    //     useEffect(() => {
    //         fetch("https://graph.facebook.com/17841564013123618/top_media?user_id=17841411766795081&fields=id,media_url,caption,permalink,media_type,comments_count,like_count&access_token=EAA9mxzmBApoBANQKYIlJnl0iLdewqw10sROg4d9IOWZAulfN0JkeMp6jMB4JH4pkYzUVJXuVyzRgBWmqlGCUaN3OyZBXq6ZAwyZBj4vFkoZBOeNUaVJH397z1uiRWVe8IOsrkeEGeQTMHMxzZBaG59peUnJiTKZCPgQzjXnbHSNJhj4h4PtjtqD")
    //           .then((response) => response.json())
    //           .then((response) => {
              
    //             console.log(response.data[0].media_url)
    //             setPost(response.data[0].media_url);
    //             setCaption(response.data[0].caption);
    //           });
               
    //         //   .then((data) => {
    //         //         const image = data.caption
    //         //         const caption = data[0]
    //         //       });
            
    //       }, 
          
         
    //       []);

        //   useEffect(() => {
        //     fetch("https://graph.facebook.com/v12.0/instagram_oembed?url=https://www.instagram.com/p/CULG9e4LLRc/&access_token=4335130499941018|637e26a2d9941e0dfa5f90cf1604eb7d")
        //       .then((response) => response.json())
              
            //   .then((data) => {
            //     console.log(data);
              
            //   });
        //   }, []);

        render(){

            return(
                <SnsWrapper>
                  <Instagram>
                    <img src={this.props.Post}/>
                    <p>{this.props.Caption}</p>
                  </Instagram>
                  <Twitter>
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="NASA"
                    options={{height: 400}}
                    
                  />
                  </Twitter>
                  
                  {/* <InstagramEmbed
                        url="https://www.instagram.com/p/CULG9e4LLRc/"
                        clientAccessToken='4335130499941018|637e26a2d9941e0dfa5f90cf1604eb7d'
                        maxWidth={320}
                        hideCaption={false}
                        containerTagName='div'
                        protocol=''
                        injectScript
                        onLoading={() => {}}
                        onSuccess={() => {}}
                        onAfterRender={() => {}}
                        onFailure={() => {}}
                    /> */}
                    
                </SnsWrapper>
            );

        }
   
}

export default Sns;


const SnsWrapper = styled.div`
height: 80vh;
position: relative;
top:50vh;
`

const Instagram = styled.div`
height: 40vh;
position: relative;

`

const Twitter = styled.div`
height: 40vh;
position: relative;

`