import { BrowserRouter as Router, Switch, Route, NavLink  } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import CountryCreate from "./components/CountryCreate";
import Login from "./components/Login";
import CountryUpdate from "./components/CountryUpdate";
import SignUp from "./components/SignUp";
import  ConfirmEmail  from "./components/ConfirmEmail";
import { AuthContextProvider, AuthContext  } from './contexts/AuthContext';
import { useContext } from "react";
import Navbar from "./components/Navbar";
import {useHistory} from 'react-router-dom';
import ErrorBoundary from './Error';


function Country() {
  

    return (
        
        <Router>
        <AuthContextProvider>
        <ErrorBoundary>
        <div>   
          <Navbar></Navbar>
           <Switch>
            <Route path="/create-countries"><CountryCreate/></Route>
            <Route path="/countries/:id/update"> <CountryUpdate/></Route>
            <Route path="/countries/signup"><SignUp/> </Route>
            <Route path="/countries/accounts/confirm-email/:key"><ConfirmEmail /></Route> 
            <Route path="/countries/login"><Login/> </Route>
            <Route path="/countries/:id"> <CountryDetail/> </Route>
            <Route path="/"> <CountryList/> </Route>
          </Switch>
        </div>
        </ErrorBoundary>
        </AuthContextProvider>
        </Router>
    );
}

export default Country;