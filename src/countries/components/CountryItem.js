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
                   <Card sx={{ maxWidth: 345}} >
                      <CardActionArea onClick = {push} sx={{ display: "flex", flexDirection: "column", textAlign: "center"}}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={country.country_image}
                          alt={country.country_image}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                           {country.country_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                           {country.content}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                </Grid>
    
    )
};
export default CountryItem;