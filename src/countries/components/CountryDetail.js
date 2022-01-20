import axios from "axios"
import { useEffect, useState ,useContext} from "react"
import { useParams } from "react-router"
import { API } from "../api"
import {useHistory, NavLink} from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext"
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styled from "styled-components"

export function CountryDetail() {
    const [country, setCountry] = useState(null)
    const { id } = useParams()
    const { user: { token } } = useContext(AuthContext)

    useEffect(() => {
      function  fetchCountry() {
        axios.get(API.countries.retrieve(id),{
          headers: {
            "Authorization": `Token ${token}`
        }
        })
          .then(res => {
            console.log(res.data)
            setCountry(res.data)
          })
      }
      fetchCountry()
      return () => null
    }, [id, token])

    return (
        
      <Detail>
      {country && (
      <Grid container spacing={2}>
        <Grid item xs={5}  style={{height: "80vh", paddingLeft: "16px", paddingRight:"16px"}}>
         {country.country_image && (
            <CountryImg>
                <img   
                src={country.country_image}  
                alt={country.country_image} 
                style={{objectFit:'cover', objectPosition: "center" , width: "100%" ,height: "100%"}}   
                />
            </CountryImg>  
          )}
        </Grid>
        <Grid item xs={7}  style={{height: "80vh"}}>
            <CountryContent>
              <NameContent>
                 <h1>{country.country_name}</h1>
              </NameContent>
              <Border></Border>
              <ContentContent>
                <p>{country.content}</p>
              </ContentContent>
            </CountryContent>
        </Grid>
      </Grid>
      )}
      </Detail>
     
     
            //   {country.is_owner && (
            //   <div>
            //   <NavLink to={`/countries/${country.id}/update`}>
            //  Update
            //   </NavLink>
            //   <NavLink to={`/countries/${country.id}/delete`}>
            //  Delete
            //   </NavLink>
            //   </div>
            //   )}
         
          
      
           
        
    )
}

export default CountryDetail


const Detail = styled.div`

margin-top: 20vh;
height: 100vh;
width: 100vw;
`

const Img = styled.div`


`

const CountryImg = styled.div`
height: 100%;
width: 100%;
overflow: hidden;
padding-right: 96px;
padding-left: 64px;
`

const CountryImg1 = styled.div`

`

const CountryContent = styled.div`

padding: 10% ;
margin-right: 20%;
display: flex;
text-align: center;
flex-direction: column;
`

const NameContent = styled.div`

padding: 2% 10% ;

`

const ContentContent = styled.div`


`
const Border = styled.div`
align-self: end;
height: 20px;
background-color: rgba(192,192,192,0.8);
font-size: 0;
line-height: 0;
width: 40vw;
margin-bottom: 15vh;
margin-right: -50%;
align-items: flex-end;
`



