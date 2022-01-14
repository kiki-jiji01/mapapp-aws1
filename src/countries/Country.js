import { BrowserRouter as Router, Switch, Route, NavLink  } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import CountryCreate from "./components/CountryCreate";
import Login from "./components/Login";
import CountryUpdate from "./components/CountryUpdate";
import CountryDelete from "./components/CountryDelete";
import SignUp from "./components/SignUp";
import  ConfirmEmail  from "./components/ConfirmEmail";
import { AuthContextProvider, AuthContext  } from './contexts/AuthContext';
import { useContext } from "react";
import Navbar from "./components/Navbar";
import {useHistory} from 'react-router-dom';



 



function Country() {
  

    return (
        
        <Router>
        <AuthContextProvider>
        <div>   
          <Navbar></Navbar>
          
           
           <Switch>
            {/* <Route path="/about" element={<About/>} />
            <Route path="/users" element={<Users />} />
            <Route path="/jobs/:id" element={<PrivateRoute><JobDetail /></PrivateRoute>} exact />
            <Route path="/jobs/:id/update" element={<PrivateRoute><JobUpdate /></PrivateRoute>} exact />
          
            <Route path="/jobs/:id/delete" element={<PrivateRoute><JobDelete /></PrivateRoute>} exact />
            <Route path="/jobs/:id/sponsor" element={<PrivateRoute><Payment /></PrivateRoute>} exact />
            <Route path="/create-job" element={<PrivateRoute><JobCreate /></PrivateRoute>} exact />

            <Route path="/login" element={<Login />} exact />
            <Route path="/payment/success" element={<Success />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="/accounts/confirm-email/:key" element={<ConfirmEmail />} exact /> */}
            <Route path="/create-countries"><CountryCreate/></Route>
            <Route path="/countries/:id/delete"> <CountryDelete/></Route>
            <Route path="/countries/:id/update"> <CountryUpdate/></Route>
            <Route path="/countries/signup"><SignUp/> </Route>
            <Route path="/countries/accounts/confirm-email/:key"><ConfirmEmail /></Route> 
            <Route path="/countries/login"><Login/> </Route>
            <Route path="/countries/:id"> <CountryDetail/> </Route>
            <Route path="/"> <CountryList/> </Route>
            
          </Switch>
        </div>
        </AuthContextProvider>
        </Router>
    );
}

export default Country;