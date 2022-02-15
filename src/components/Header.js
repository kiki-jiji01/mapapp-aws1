import React, { useContext } from "react";
import { API } from "../countries/api";
import { AuthContext } from "../countries/contexts/AuthContext";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { Box } from "@material-ui/core";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faAirbnb, faLinkedin,  } from '@fortawesome/free-brands-svg-icons';
import styled from "styled-components"


const styles = {
   "&.MuiButton-root": {
     
   },
   "&.MuiButton-text": {
     color: "white",
     
     
   },
   "&.MuiButton-contained": {
     color: "yellow"
   },
   "&.MuiButton-outlined": {
     color: "brown"
   },
   marginRight: "-6px",
 };


 const textstyles = {
  "&.MuiButton-root": {
   
  },
  "&.MuiButton-text": {
    color: "white",
    
    
  },
  "&.MuiButton-contained": {
    color: "yellow"
  },
  "&.MuiButton-outlined": {
    color: "brown"
  },
 

};


function Header (){
  const { user ,logout } = useContext(AuthContext)
  const history = useHistory();


  function handleSubmit() {
    axios.post(API.auth.logout)
    .then(() => {
      history.push(`/countries/login`)
      logout()
    })
    return () => null
  }  

  
        return(
        <HeaderWrapper>
          <HeaderWrapper1> 
            <Box onClick = {() => history.push(`/`)} sx={{cursor: "pointer", zIndex: 10000}}>
              <LogoWrapper>Mapwith</LogoWrapper>
            </Box>
          
            <HeaderWrapper2> 
              <LinkedinWrapper>
               <FontAwesomeIcon icon={faLinkedin} size="lg" mask={ faCircle } size="2x" transform="shrink-6" />
              </LinkedinWrapper>
              <AirbnbWrapper>
               <FontAwesomeIcon icon={faAirbnb} size="lg" mask={ faCircle } size="2x" transform="shrink-6"/>
              </AirbnbWrapper>
          
              <CountryListWrapper>
                <Button sx={styles} variant="text"   onClick = {() => history.push('/country-list')}>CountryList</Button>
                <FontAwesomeIcon icon={faArrowRight} size="lg"  size="2x"  transform="shrink-6" />
              </CountryListWrapper>
              {user ?(
                <>
                <Button  size="small" sx={textstyles} variant="text"   onClick={handleSubmit}>
                  Logout
                </Button>
                </>
                ):(
                <>
                <Button  size="medium" sx={textstyles} variant="text"   onClick = {() => history.push(`/countries/login`)}>
                  Login 
                </Button>
                
                <Button  size="medium" sx={textstyles} variant="text"   onClick = {() => history.push(`/countries/signup`)}>
                  Signup
                </Button>
                </>
                
              )}
            </HeaderWrapper2> 
          </HeaderWrapper1> 
        </HeaderWrapper>
        );
    
}

export default Header;


const HeaderWrapper= styled.div`
position: fixed;
background-color: rgba(0, 0, 0, .65);
width: 100%;
z-index:2000;
top: 0;
`


const HeaderWrapper1 = styled.div`
width: 80%;
box-sizing: border-box;
padding: 15px 25px;
justify-content: center;
top: 0;
color: white;
display: flex;
margin: auto;
position: relative;
align-items: center;
`

const LogoWrapper= styled.div`
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
`


const HeaderWrapper2 = styled.div`
display: flex;
justify-content: space-between;
position: absolute;
width: 100%;
`


const LinkedinWrapper= styled.div`

margin-right: 24px;
`

const AirbnbWrapper= styled.div`
margin-right: auto;
`
const CountryListWrapper= styled.div`
margin-right: 18px;
display: flex;
align-items: center;
justify-content: center;
`



