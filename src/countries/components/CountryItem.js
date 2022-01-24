import React from 'react';
import { useEffect, useState , useContext} from "react"
import {Grid,Paper,Typography} from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import styled from "styled-components"
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import {useHistory} from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext"

const CountryItem = ({country}) => {
    const { user ,logout } = useContext(AuthContext)
    const history = useHistory();

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
                          <FlowWrap >
                            <Typography gutterBottom variant="h5" component="div">
                            <p>{country.country_name}</p>
                            </Typography>
                          </FlowWrap>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                </Grid>
    
    )
};
export default CountryItem;


const FlowWrap= styled.div`



padding: 8px 64px 8px 64px;
background-color: rgba(239,239,239,.85);

p{
  padding: 2px 16px 2px 16px;
  font-size: 12px;
  border: 1px solid #000;
}

`