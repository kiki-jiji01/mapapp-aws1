import React from "react";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
class Search extends React.Component{
    render(){
        return(
         <div className="Main"> 
          <AmplifySignOut />
         </div>
        );
    }
}

export default Search;