import React,{useState,useEffect} from 'react';
import styled from "styled-components"



function Footer() {
    
    const [Post,setPost] = useState([]);
    const [Caption,setCaption] = useState([]);
    const [Post1,setPost1] = useState([]);
    const [Caption1,setCaption1] = useState([]);
    const [Post2,setPost2] = useState([]);
    const [Caption2,setCaption2] = useState([]);


    useEffect(() => {
        fetch("https://graph.facebook.com/17841564013123618/top_media?user_id=17841411766795081&fields=id,media_url,caption,permalink,media_type,comments_count,like_count&access_token=EAA9mxzmBApoBAM5QVFqdF0AUgx5RrG4ZBZAyxZCwj2J1NqGjOg44VqkSd5bwmCcnumT9A2wZASIWgCwKhCn9W2NcIqmy8CH0NnaV7tPduEF361OWN61qN6U4DqSEVYRL3qnYPVNbDZCzMClPGbofZBgPPLjZCgvSOfkkErQXUtSyXwLrUu0FbFI")
          .then((response) => response.json())


          .then((response) => {
            console.log(response)
            console.log(response.data[0])
            setPost(response.data[0].media_url);
            setCaption(response.data[0].caption);
            setPost1(response.data[1].media_url);
            setCaption1(response.data[1].caption);
            setPost2(response.data[2].media_url);
            setCaption2(response.data[2].caption);
          });
           
        //   .then((data) => {
        //         const image = data.caption
        //         const caption = data[0]
        //       });
        
      }, 

      
      
     
      []);
    


    return(
        <FooterContent>
            <FooterContent1>
              <FooterImage>
                  <img src={Post} height="250vh"/>
              </FooterImage>
              <InstagramCaption>
                <p>{Caption}</p>
              </InstagramCaption>
            </FooterContent1>
            
            <FooterContent2>
              <FooterImage>
                  <img src={Post1} height="250vh"/>
              </FooterImage>
              <InstagramCaption>
                <p>{Caption1}</p>
              </InstagramCaption>
            </FooterContent2>

            <FooterContent3>
              <FooterImage>
                  <img src={Post2} height="250vh"/>
              </FooterImage>
              <InstagramCaption>
                <p>{Caption2}</p>
              </InstagramCaption>
            </FooterContent3>
        </FooterContent>

        
        
    )
}


export default Footer;

const FooterContent = styled.div`
justify-content: center;
margin-left: 32px;
margin-right: 32px;
display: flex;

`

const FooterContent1　 = styled.div`
width: 25%;
margin-right: 12px;
margin-left: 12px;


`

const FooterContent2= styled(FooterContent1)`

`

const FooterContent3= styled(FooterContent1)`

`

const FooterImage　 = styled.div`
object-fit: contain;
text-align:center;
background-color: #F8F8F8;
`

const InstagramCaption　 = styled.div`

`