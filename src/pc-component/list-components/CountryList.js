import { useEffect, useState , useContext} from "react"
import ListPage from "./ListPage"
import { AuthContext } from '../../shared-component/contexts/AuthContext';
import { API } from '../../shared-component/api';
import axios from "axios"
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

const styles = {
  "&.MuiButton-root": {
   
  },
  "&.MuiButton-text": {
    color: "black"
    
  },
  "&.MuiButton-contained": {
    color: "yellow"
  },
  "&.MuiButton-outlined": {
    color: "brown"
  },
};


function CountryList() {
  const [countries, setCountries] = useState(null)
  const { user ,logout } = useContext(AuthContext)
  const history = useHistory();
  
  // The function  where the event occurs when CountryCreate is clicked
  const push = () => {
    {user ? (history.push(`/create-countries`)):(history.push(`/countries/login`))}
  }

  // Get the coutrylists data from API
  useEffect(() => {
    function fetchCountries() {
      axios.get(API.countries.list)
        .then(res => {
          console.log(res.data)
          setCountries(res.data)
        })
    }
    fetchCountries()
    return () => null
  }, [])



  return (
    
    
    <ListWrapper>
      <ListWrapper1>
       <TextWrapper><p>Your Country List</p></TextWrapper>
       <CreateButtonWrapper>
            <FontAwesomeIcon icon={faPen} size="sx"   transform="shrink-10" style={{ marginRight: "-8px"}} />  
            <Button sx={styles} variant="text"  style={{ letterSpacing: "1px"}}  onClick = {push}>CREATE LIST</Button>
       </CreateButtonWrapper>
      </ListWrapper1>
      
      {!countries && "Loading..."}
      <ListItemWrapper>
       <ListPage  countries={countries}/>
      </ListItemWrapper>
     
    </ListWrapper>
    
  );
}

export default CountryList


const ListWrapper = styled.div`
margin-top: 20vh;
`


const ListItemWrapper = styled.div`
margin-left 5%;
`


const ListWrapper1= styled.div`
margin-left: 30%;
margin-right: 30%;
margin-bottom: 5vh;
font-size: 36px;
color: black;
`


const TextWrapper= styled.div`
text-align:center;
margin-bottom: 15vh;
p{
  letter-spacing: 6px;
}
`


const CreateButtonWrapper = styled.div`
font-family: 'DDINExpRegular',"Times New Roman",serif;
display: flex;
align-items: center;
justify-content: center;
`