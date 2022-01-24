import React from "react";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import styled from "styled-components"
import {Auth} from "aws-amplify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCircle, faCity, faCoffee, faUtensils,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faAirbnb, faLinkedin,  } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {useHistory} from 'react-router-dom';

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


function Search (){

  const history = useHistory();
    //  signOut = (e) => {
    //     e.preventDefault();
    //     Auth.signOut();
    //     window.location.reload()
    //   }


    
     

        return(
        
         <Topwrapper> 
           <Logo>Mapwith</Logo>
           <List>
            <Button sx={styles} variant="text"   onClick = {() => history.push('/countries')}>CountryList</Button>
            <FontAwesomeIcon icon={faArrowRight} size="lg"  size="2x"  transform="shrink-6" />
           </List>
           
           
           <Icon>
            <Linkedin>
             <FontAwesomeIcon icon={faLinkedin} size="lg" mask={ faCircle } size="2x" transform="shrink-6" />
            </Linkedin>
            <Airbnb>
             <FontAwesomeIcon icon={faAirbnb} size="lg" mask={ faCircle } size="2x" transform="shrink-6"/>
            </Airbnb>
           </Icon>
          
        </Topwrapper> 
        );
    
}

export default Search;


const Topwrapper = styled.div`
display: flex;
position: relative;
margin-left: auto;
margin-right: auto;
`


const Logo= styled.div`

flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
`
// const Nav= styled.div`

// margin-left: 64px;
// flex-grow: 1;
// flex-shrink: 1;
// flex-basis: 0%;
// order: -1;
// `


const List= styled.div`
margin-right: 48px;
display: flex;

`


const Icon= styled.div`
margin-right: 64px;
display: flex;

`

const Linkedin= styled.div`
margin-right: 12px;


`

const Airbnb= styled.div`
margin-right: 12px;


`


const ButtonWrapper = styled.div`

margin-left: 0;
margin-right: 27px;

`

