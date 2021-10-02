import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import React,{useState,useEffect} from 'react';
import Top from './components/Top';
import Main from './components/Main';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
import styled from "styled-components"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';




Amplify.configure(awsconfig);







const App = () => {
 
    
        const [authState, setAuthState] = React.useState();
        const [user, setUser] = React.useState();
        const [open, setOpen] = React.useState(false);
       




        React.useEffect(() => {
            return onAuthUIStateChange((nextAuthState, authData) => {
                setAuthState(nextAuthState);
                setUser(authData)
            });
                
        },[]);


        



        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };

       

    return authState === AuthState.SignedIn && user ?(
            <div className="main"> 
            <Main />
            </div>
              ):(
                <Topwrapper> 
          
                <Banner>
                 <h2>Map With</h2>
                 <p>
                 Where do you wanna live with your beatiful partner in the future?<br/>
                 If you wish strong and strong, You can go everywhere you want.<br/> Let's start your dream here Get
                 
                 </p>


                 <Button variant="outlined" onClick={handleClickOpen}>
                  Login & SighUp
                 </Button>
                  <Dialog
                    open={open}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogContent>
                      <AmplifyAuthenticator>
                      <AmplifySignUp
                        slot="sign-up"
                        formFields={[
                          { type: "username" },
                          { type: "password" },
                          { type: "email" }
                        ]}
                      />
                      </AmplifyAuthenticator>
                    </DialogContent>                  
                  </Dialog>
                 
                </Banner>
                
                 
              </Topwrapper>






                
      
          
        
           
    );
  
}

export default App;


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