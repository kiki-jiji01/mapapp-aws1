import { BrowserRouter as Router, Switch, Route, NavLink  } from "react-router-dom";
import Button from '@mui/material/Button';
import { AuthContextProvider, AuthContext  } from '../contexts/AuthContext';
import { useContext } from "react";
import {useHistory} from 'react-router-dom';



function Navbar() {
  
    const { user ,logout } = useContext(AuthContext)
    const history = useHistory();


    function handleSubmit() {
        logout()
        history.push(`/countries`)
      }
    return (
        
       
        <div>   
           <NavLink to={`/create-countries`}>
                    Make a list of country
           </NavLink>


          {user ?(
             
              <Button  variant="text"   onClick={handleSubmit}>Logout</Button>
          ):(
           
            <NavLink to={`/countries/login`}>
            Login
           </NavLink>
          )}
           
          
        
        </div>
     
       
    );
}

export default Navbar;