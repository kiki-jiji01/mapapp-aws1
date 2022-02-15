
import './App.css';
import Main from './components/Main';
import Header from "./components/Header";
import Login from "./countries/components/Login";
import CountryList from "./countries/components/CountryList";
import ErrorBoundary from "./countries/Error";
import CountryCreate from "./countries/components/CountryCreate";
import CountryUpdate from "./countries/components/CountryUpdate";
import SignUp from "./countries/components/SignUp";
import ConfirmEmail from "./countries/components/ConfirmEmail";
import CountryDetail from "./countries/components/CountryDetail";
import {AuthContextProvider} from './countries/contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const App = () => {


    return (

       <Router>
          <AuthContextProvider>
           <ErrorBoundary>
            <div>
            <Header/>
            <Switch>
              <Route path="/create-countries"><CountryCreate/></Route>
              <Route path="/countries/:id/update"> <CountryUpdate/></Route>
              <Route path="/countries/signup"><SignUp/> </Route>
              <Route path="/countries/accounts/confirm-email/:key"><ConfirmEmail /></Route> 
              <Route path="/countries/login"><Login/> </Route>
              <Route path="/countries/:id"> <CountryDetail/> </Route>
              <Route path="/country-list"><CountryList/> </Route>
              <Route path="/"><div className="main"> <Main /> </div></Route>
            </Switch>
            </div>
           </ErrorBoundary>
          </AuthContextProvider>
        </Router>
    );
             
}

export default App;


