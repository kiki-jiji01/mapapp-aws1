import { BrowserRouter as Router, Switch, Route, NavLink  } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import CountryCreate from "./components/CountryCreate";


function Country() {
    return (
        
        <Router>
        <div>   
           <NavLink to={`/create-country`}>
                    Make a list of country
           </NavLink>
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
            <Route path="/create-country"><CountryCreate/> </Route>
            <Route path="/countries/:id"> <CountryDetail/> </Route>
            <Route path="/"> <CountryList/> </Route>
            
          </Switch>
        </div>
        </Router>
    );
}

export default Country;