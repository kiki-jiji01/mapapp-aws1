import { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import {useHistory, NavLink} from 'react-router-dom';
import axios from "axios"
import { API } from '../api'
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from 'react-router';

export function CountryUpdate() {
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
    }, [id, token])

    console.log(country)

    function handleSubmit(values) {
        setLoading(true)
        axios.put(API.countries.update(id), values, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                history.push(`/countries/${id}`)
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
                <Formik
                    initialValues={{
                        country_name: country.country_name,
                        content: country.content,
                       
                    }}
                    onSubmit={handleSubmit}>

                    {({ errors, touched }) => (
                        <Form>
                            <label htmlFor="country_name">country_name</label>
                        <Field id="country_name" name="country_name" placeholder="Japan" />
                        {touched.country_name && errors.country_name && <div>{errors.country_name}</div>}

                        <label htmlFor="content">content</label>
                        <Field id="content" name="content" placeholder="Cook" />
                        {touched.content && errors.content && <div>{errors.content}</div>}


                        <button type="submit">Submit</button>
                        </Form>
                    )}

                </Formik>
            )}
        </div>
    )

}

export default CountryUpdate