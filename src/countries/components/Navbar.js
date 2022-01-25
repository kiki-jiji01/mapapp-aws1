import { BrowserRouter as Router, Switch, Route, NavLink  } from "react-router-dom";
import Button from '@mui/material/Button';
import { AuthContextProvider, AuthContext  } from '../contexts/AuthContext';
import { useContext } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios"
import { API } from "../api"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCircle, faCity, faCoffee, faUtensils,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Box } from "@mui/system";


const buttonstyles = {
  "&.css-ae8fex-MuiButtonBase-root-MuiButton-root":{
    backgroundColor: "none",
    boxShadow: "none",
  },
 
  "&.MuiButton-contained": {
    color: "white",
    backgroundColor: "none",
    boxShadow: "none",
  },
  
  
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
  marginRight: "-12px"

};


function Navbar() {
  
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
    return (
        
      

        <Topwrapper> 
          <Secondwrapper>
          
          <Logo>Mapwith</Logo>
         
          {user ?(
          <>
          <Button  size="medium" sx={textstyles} variant="text"   onClick={handleSubmit}>
            <LogoutButton> Logout</LogoutButton>
          </Button>
          <Button  size="medium" sx={textstyles} variant="text"   onClick = {() => history.push(`/create-countries`)}>Create Country List</Button>
          <span style={{marginLeft: "1px"}}> <FontAwesomeIcon icon={faArrowRight} size="lg"  size="2x"  transform="shrink-6" /></span>
          </>
          ):(
          <Icon>
            <Linkedin>
                <Button  size="medium" sx={textstyles} variant="text"   onClick = {() => history.push(`/countries/login`)}>
                 <LoginButton>Login </LoginButton>
                </Button>
            </Linkedin>

            <Airbnb>
                <Button  size="medium" sx={textstyles} variant="text"   onClick = {() => history.push(`/countries/signup`)}>
                  Signup
                </Button>
            </Airbnb>
          </Icon>
          )}
          </Secondwrapper>
        </Topwrapper> 
     
       
    );
}

export default Navbar


const Topwrapper = styled.div`

position: fixed;
margin-left: auto;
margin-right: auto;
background-color: rgba(0,0,0,.85);
width: 100vw;
justify-content: center;
z-index:1000;
box-sizing: border-box;
top:0;
color: white;
`

const Secondwrapper = styled.div`
padding: 21px 82px;
display: flex;
`

const LogoutButton = styled.div`
margin-right: 64px;
`
const LoginButton = styled.div`
margin-right: 64px;
`


const Logo= styled.div`


flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
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
