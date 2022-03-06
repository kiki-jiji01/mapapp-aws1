import React,{useContext} from 'react';
import { AuthContext } from '../../shared-component/contexts/AuthContext';
import {useHistory} from 'react-router-dom';
import {Grid, Typography} from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import styled from "styled-components"



function CountryItem  ({country})  {
    const { user ,logout } = useContext(AuthContext)
    const history = useHistory();
    
    // The function  where the event occurs when CountryCreate is clicked
    const push = () => {
        {user ? (history.push(`/countries/${country.id}`)):(history.push(`/countries/login`))}
    }

    if(!country)  return <div></div>


  
    return (  
             
               
                <Grid item xs={4}>
                   <Card sx={{ maxWidth: 400, borderRadius:0, boxShadow: 0}} >
                      <CardActionArea onClick = {push} sx={{ display: "flex", flexDirection: "column", textAlign: "center"}}>
                        <CardMedia
                          component="img"
                          height="240"
                          image={country.country_image}
                          alt={country.country_image}
                        />
                        <CardContent sx={{marginTop: -5, zIndex:100}}>
                          <FlowWrapper >
                            <Typography gutterBottom variant="h5" component="div">
                            <p>{country.country_name} - {country.city_name}</p>
                            </Typography>
                          </FlowWrapper>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                </Grid>
    
    )
};
export default CountryItem;


const FlowWrapper= styled.div`
padding: 8px 64px 8px 64px;
background-color: rgba(239,239,239,.85);

p{
  padding: 2px 16px 2px 16px;
  font-size: 12px;
  border: 1px solid #000;
}
`