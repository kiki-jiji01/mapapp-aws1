import { useContext, useEffect, useState } from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import axios from "axios"
import { API } from '../api'
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from 'react-router';

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
        <div>
            {loading && "Submitting..."}
            {loadingCountry && "Fetching Country Details..."}
            {country && (
                <form onSubmit={handleSubmit}>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    )

}

export default CountryDelete