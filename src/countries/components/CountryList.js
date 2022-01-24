import { useEffect, useState , useContext} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import { API } from "../api"
import { AuthContext } from "../contexts/AuthContext"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useHistory} from 'react-router-dom';
import styled from "styled-components"
import ListPage from "./ListPage"


function CountryList() {
  const [countries, setCountries] = useState(null)
  const { user ,logout } = useContext(AuthContext)
  const history = useHistory();


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
      <ListH1>
       <ListH2><p>Your Country List</p></ListH2>
      </ListH1>
      
      {!countries && "Loading..."}
      <ListWrapper1>
       <ListPage  countries={countries}/>
      </ListWrapper1>
     
    </ListWrapper>
    
  );
}

export default CountryList

const ListWrapper = styled.div`

margin-top: 30vh;

`

const ListWrapper1 = styled.div`

margin-left 5%;

`

const ListH1= styled.div`

margin-left: 30%;
margin-right: 30%;
margin-bottom: 20vh;
font-size: 36px;
color: black;

`

const ListH2= styled.div`

text-align:center;

p{
  letter-spacing: 6px;
}

`