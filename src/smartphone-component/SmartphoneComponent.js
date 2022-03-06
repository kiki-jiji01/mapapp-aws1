import Main from './toppage-components/Main';
import Header from './toppage-components/Header';
import Login from "./list-components/Login";
import CountryList from "./list-components/CountryList";
import ErrorBoundary from '../shared-component/Error';
import CountryCreate from "./list-components/CountryCreate";
import CountryUpdate from "./list-components/CountryUpdate";
import SignUp from "./list-components/SignUp";
import ConfirmEmail from "./list-components/ConfirmEmail";
import CountryDetail from "./list-components/CountryDetail";
import { AuthContextProvider } from '../shared-component/contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



const SmartphoneComponent = () => {


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

export default SmartphoneComponent;
