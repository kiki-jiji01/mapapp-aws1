import React from "react";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import Button from '@mui/material/Button';
import styled from "styled-components"
import {Auth} from "aws-amplify";


class Search extends React.Component{


     signOut = (e) => {
        e.preventDefault();
        Auth.signOut();
        window.location.reload()
      }

    render(){
     

        return(
         <Topwrapper> 
           <Logo>Mapwith</Logo>
           <Nav>
              <ButtonWrapper>
               <Button variant="text" onClick={this.signOut} > Logout </Button>
              </ButtonWrapper>
           </Nav>
          
        </Topwrapper> 
        );
    }
}

export default Search;


const Logo= styled.div`

flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
`
const Nav= styled.div`




flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
order: -1;
`

const Topwrapper = styled.div`
display: flex;
position: relative;
margin-left: auto;
margin-right: auto;
`

const ButtonWrapper = styled.div`

margin-left: 0;
margin-right: 27px;

`

