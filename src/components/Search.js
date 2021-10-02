import React from "react";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';


class Search extends React.Component{
    
    



    render(){
        return(
         <div className="Main"> 
           <Button  variant="outlined" >
               <AmplifySignOut />
            </Button>
          
         </div>
        );
    }
}

export default Search;