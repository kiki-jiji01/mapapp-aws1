import React from 'react';
import CountryItem from './CountryItem';
import {Grid} from '@material-ui/core';

function ListPage  ({countries}) {

    if(!countries)  return <div></div>

    // pass countriees data to CountryItem component
    const renderedCountries =  countries.map((country) => {
        return <CountryItem  country={country} />
    });

    return (
        <Grid container spacing={6}>{renderedCountries}</Grid> 
    )
};
export default ListPage;


