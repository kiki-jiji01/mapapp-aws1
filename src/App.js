import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import React,{useState,useEffect} from 'react';
import Top from './components/Top';
import Main from './components/Main';

class App extends React.Component{
  render() {
    return (
      <div className="App">
       <Router>
         <Switch>
           <Route path="/top">
            <Top/>
           </Route>
           <Route path="/main">
            <Main/>
           </Route>     

         </Switch>
       </Router>
        
      </div>
    );
  }
}

export default App;
