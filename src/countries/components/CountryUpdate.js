import { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import {useHistory, NavLink} from 'react-router-dom';
import axios from "axios"
import { API } from '../api'
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from 'react-router';


function ImagePreview({ file }) {
    const [imageSrc, setImageSrc] = useState(null)

    useEffect(() => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setImageSrc(reader.result)
        }
        reader.readAsDataURL(file)
    })

    return (
        <div>
            {!imageSrc && "Loading..."}
            {imageSrc && (
                <img src={imageSrc} className="h-20 w-20 px-3 py-3" alt={file.name} />
            )}
        </div>
    )
}




export function CountryUpdate() {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [loadingCountry, setLoadingCountry] = useState(false)
    const [file, setFile] = useState(null)
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
   
       

        console.log(values)
        setLoading(true)
        const data = new FormData()
        data.append('country_image', file)
        data.append('content', values.content)
        data.append('country_name', values.country_name)

        { file  ? (

        axios.put(API.countries.update(id), data, {
            headers: {
                "Authorization": `Token ${token}`,
               
            }
        })
            .then(res => {
                console.log(res.data)
                history.push(`/`)
            })
            .finally(() => {
                setLoading(false)
            })
        ):( 
            setLoading(false)
            .then( history.push(`/countries/${country.id}/update`))
           
            
        )}
   
    }

    return (
        <div>
            {loading && "Submitting..."}
            {loadingCountry && "Fetching Country Details..."}
            {country && (
                <Formik
                    initialValues={{
                        country_image:country.country_image,
                        country_name: country.country_name,
                        content: country.content,
                       
                    }}
                    validate={values => { 
                        const errors = {};
                        if (!values.country_name) {
                          errors.country_name = 'country_nameを入力してください' 
                        }
                        if (!values.content) {
                            errors.content = 'contentを入力してください' 
                          }
                        // if (!values.country_image) {
                        // errors.country_image = 'contentを入力してください' 
                        // }
                        return errors;
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

                        
                        <div >
                            <label >
                                <span >country_image</span>
                                <input
                                onChange={e => setFile(e.target.files[0])}
                                type="file"
                               
                                />
                            </label>
                            {file && (
                                <ImagePreview file={file} />
                            )}
                        </div>

                       


                        <button type="submit">Submit</button>
                        </Form>
                    )}

                </Formik>
            )}
        </div>
    )

}

export default CountryUpdate