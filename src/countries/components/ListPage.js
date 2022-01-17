import React from 'react';
import {Grid} from '@material-ui/core';
import styled from "styled-components";
import CountryItem from './CountryItem';

const ListPage = ({countries}) => {

    if(!countries)  return <div></div>

    const renderedCountries =  countries.map((country) => {
        return <CountryItem  country={country} />
        // console.log(video.id);
    });

    return (
        <Grid container spacing={2}>{renderedCountries}</Grid> 
    )
};
export default ListPage;

const RenderCountry = styled.div`




`