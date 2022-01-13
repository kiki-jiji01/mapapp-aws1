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

import Country from './countries/Country';
import CountryDetail from "./countries/components/CountryDetail";



// Amplify.configure(awsconfig);




const App = () => {
 
    
        // const [authState, setAuthState] = React.useState();
        // const [user, setUser] = React.useState();
        // const [open, setOpen] = React.useState(false);
       




        // React.useEffect(() => {
        //     return onAuthUIStateChange((nextAuthState, authData) => {
        //         setAuthState(nextAuthState);
        //         setUser(authData)
        //     });
                
        // },[]);


        



        // const handleClickOpen = () => {
        //   setOpen(true);
        // };
      
        // const handleClose = () => {
        //   setOpen(false);
        // };

       

    return (
    // authState === AuthState.SignedIn && user ?(
         <Router>
            
            <Switch>
              <Route path="/countries"><Country/> </Route>
              <Route path="/"><div className="main"> <Main /> </div></Route>
            </Switch>

        </Router>
    );
              // ):(
              
    //             <Topwrapper> 
    //              <Secondwrapper> 
    //             <Banner>
    //              <h2>Map With</h2>
    //              <p>
    //              Where do you wanna live with your beatiful partner in the future?
                
    //              </p>


    //              <Button  variant="contained" 
    //                       onClick={handleClickOpen} 
                          
    //               >
    //               Login & SighUp
    //              </Button>
    //               <Dialog
    //                 open={open}
    //                 // TransitionComponent={Transition}
    //                 keepMounted
    //                 onClose={handleClose}
    //                 aria-describedby="alert-dialog-slide-description"
    //               >
    //                 <DialogContent>
    //                   <AmplifyAuthenticator>
    //                   <AmplifySignUp
    //                     slot="sign-up"
    //                     formFields={[
    //                       { type: "username" },
    //                       { type: "password" },
    //                       { type: "email" }
    //                     ]}
    //                   />
    //                   </AmplifyAuthenticator>
    //                 </DialogContent>                  
    //               </Dialog>
                 
    //             </Banner>
    //             </Secondwrapper> 
                 
    //           </Topwrapper>






                
      
          
        
           
    // );
  
}

export default App;


// const Topwrapper = styled.div`

// @media (max-width: 561px){
// height: 59vh;
// }
// `


// const Secondwrapper = styled.div`

// height: 100vh;
// position: relative;
// background:linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
// url("https://images.unsplash.com/photo-1517449905587-f80695d63356?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGNpdHklMjBhdCUyMG5pZ2h0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60")center center ;
// background-size: cover;
// overflow: hidden;
// z-index:0;
// text-align:center;

// `


// const Banner= styled.div`

// // background-color: red;
// color: white;
// position: absolute;
// margin: auto;
// width:100%;
// top:  0;                    
// bottom: 0;                 
// left:  0;                  
// right:  0;  
// line-height: 3.5;
// height: 50vh;
// font-family: "Droid Serif", serif;
// opacity: 1;
// h2{
//     font-weight: 700;
//     font-size: 30px;
// }

// p{
//     font-weight: 400;
//     font-size: 24px;
// }

// `