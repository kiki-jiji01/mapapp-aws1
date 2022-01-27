import React, { useContext } from "react";
import Button from '@mui/material/Button';
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCircle, faCity, faCoffee, faUtensils,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faAirbnb, faLinkedin,  } from '@fortawesome/free-brands-svg-icons';
import {useHistory} from 'react-router-dom';
import { AuthContext } from "../countries/contexts/AuthContext";
import { API } from "../countries/api";
import { Box } from "@material-ui/core";
import axios from "axios";



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


function Search (){
  const { user ,logout } = useContext(AuthContext)
  const history = useHistory();


  function handleSubmit() {
    axios.post(API.auth.logout)
    .then(res => {
      history.push(`/countries/login`)
      logout()
      
    })
    return () => null
}

  
        return(
        <SearchWrapper>
        <Topwrapper> 
          <Box onClick = {() => history.push(`/`)} sx={{cursor: "pointer", zIndex: 10000}}>
            <Logo>Mapwith</Logo>
          </Box>
        
         <Topwrapper1> 
          <Linkedin>
           <FontAwesomeIcon icon={faLinkedin} size="lg" mask={ faCircle } size="2x" transform="shrink-6" />
          </Linkedin>
          <Airbnb>
           <FontAwesomeIcon icon={faAirbnb} size="lg" mask={ faCircle } size="2x" transform="shrink-6"/>
          </Airbnb>
      
      
          <List>
            <Button sx={styles} variant="text"   onClick = {() => history.push('/country-list')}>CountryList</Button>
            <FontAwesomeIcon icon={faArrowRight} size="lg"  size="2x"  transform="shrink-6" />
          </List>
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
         </Topwrapper1> 
         
      </Topwrapper> 
      </SearchWrapper>
        );
    
}

export default Search;


const SearchWrapper= styled.div`
position: fixed;
background-color: rgba(0, 0, 0, .65);
width: 100%;
z-index:2000;
top: 0;
`


const Topwrapper = styled.div`
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

const Logo= styled.div`
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
`


const Topwrapper1 = styled.div`
display: flex;
justify-content: space-between;
position: absolute;
width: 100%;
`


const Linkedin= styled.div`

margin-right: 24px;
`

const Airbnb= styled.div`
margin-right: auto;
`
const List= styled.div`
margin-right: 18px;
display: flex;
align-items: center;
justify-content: center;
`
const LogoutButton = styled.div`
margin-right: 64px;
`


