import { useContext, useEffect, useState } from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import axios from "axios"
import { API } from '../api'
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from 'react-router';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export function CountryDelete() {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [loadingCountry, setLoadingCountry] = useState(false)

    const [country, setCountry] = useState(null)
    const { id } = useParams()

    const { user: { token } } = useContext(AuthContext)

    useEffect(() => {
        if (country && !country.is_owner) {
            history.push(`/`)
        }
        return () => null
    })
    
    useEffect(() => {
        setLoadingCountry(true)
        function fetchCountry() {
            axios.get(API.countries.retrieve(id),{
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
                .then(res => {
                    setCountry(res.data)
                })
                .finally(() => {
                    setLoadingCountry(false)
                })
        }
        fetchCountry()
        return () => null
    }, [id,token])

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        axios.delete(API.countries.delete(id), {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                history.push(`/countries`)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "20vh"}}>
            {loading && "Submitting..."}
            {loadingCountry && "Fetching Country Details..."}
            {country && (
            <Button  variant="contained" fullWidth type="submit" onClick = {handleSubmit}>
                Submit
            </Button>
            )}
        </Container>
    )

}

export default CountryDelete