import { Formik, Field, Form } from 'formik';
import axios from "axios"
import { API } from '../api'
import { useState } from 'react';

export function CountryCreate() {
    const [loading, setLoading] = useState(false)
    
    function handleSubmit(values) {
        console.log(values)
        setLoading(true)
        axios.post(API.countries.create, values)
            .then(res => {
                console.log(res.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    country_name: '',
                    content: '',
                   
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
        </div>
    )

}

export default CountryCreate