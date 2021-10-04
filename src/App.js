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
                 Where do you wanna live with your beatiful partner in the future?
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
background: url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60")center center ;
width:100%;
`

const Banner= styled.div`

color: white;
position: absolute;
margin: auto;
width:100%;
padding: 50px;
top:  30vh;                    /* 上からの位置指定 */
bottom:  70vh;                 /* 下からの位置指定 */
left:  0;                   /* 左からの位置指定 */
right:  0;  
line-height:normal;
text-align:center;

h2{
    font-weight: 700;
    font-size: 30px;
}

p{
    font-weight: 400;
    font-size: 24px;
}

`