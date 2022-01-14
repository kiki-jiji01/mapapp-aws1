import { BrowserRouter as Router, Switch, Route, NavLink  } from "react-router-dom";
import Button from '@mui/material/Button';
import { AuthContextProvider, AuthContext  } from '../contexts/AuthContext';
import { useContext } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios"
import { API } from "../api"


function Navbar() {
  
    const { user ,logout } = useContext(AuthContext)
    const history = useHistory();


    function handleSubmit() {
        axios.post(API.auth.logout)
        .then(res => {
          logout()
        history.push(`/countries`)
        })
    }
    return (
        
       
        <div>   
           <NavLink to={`/create-countries`}>
                    Make a list of country
           </NavLink>


          {user ?(
             
              <Button  variant="text"   onClick={handleSubmit}>Logout</Button>
          ):(
           <div>
            <NavLink to={`/countries/login`}>
            Login
           </NavLink>
            <NavLink to={`/countries/signup`}>
            SignUp
           </NavLink>
           </div>
          )}
           
          
        
        </div>
     
       
    );
}

export default Navbar