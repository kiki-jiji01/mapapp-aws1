import React from "react";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import styled from "styled-components"

class Search extends React.Component{
    
    



    render(){


        
       


        return(
         <Topwrapper> 
           <Button  variant="text" 　>
               <AmplifySignOut />
            </Button>
          
        </Topwrapper> 
        );
    }
}

export default Search;


const Topwrapper = styled.div`
// height: 10vh;
position: relative;

`