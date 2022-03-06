
import './App.css';
import PcComponent from './pc-component/PcComponent';
import SmartphoneComponent from './smartphone-component/SmartphoneComponent';
import MediaQuery from "react-responsive";





const App = () => {


    return (
      <>
        <MediaQuery query="(min-width: 1024px)">　
          <PcComponent/>
        </MediaQuery>
        <MediaQuery query="(max-width: 1023px)">　
          <SmartphoneComponent/>
        </MediaQuery>
      </>
    );
             
}

export default App;


