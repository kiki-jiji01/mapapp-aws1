import { Formik, Field, Form } from 'formik';
import axios from "axios"
import { API } from '../api'
import {  useContext,useState , useEffect} from 'react';
import { AuthContext } from "../contexts/AuthContext";
import {useHistory} from 'react-router-dom';



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



export function CountryCreate() {
    const [loading, setLoading] = useState(false)
    const { user: { token } } = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const history = useHistory();

    function handleSubmit(values) {
        console.log(values)
        setLoading(true)
        const data = new FormData()
        data.append('country_image', file)
        data.append('content', values.content)
        data.append('country_name', values.country_name)

        {file ? (

        axios.post(API.countries.create, data,{
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                history.push(`/countries`)
                console.log(res.data)
            })
            .finally(() => {
                setLoading(false)
            })
        ):(
            setLoading(false)
            .then( history.push(`/create-countries`))
           
            
        )}
            return () => null
    }

    return (
        <div>
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    country_image:"",
                    country_name: '',
                    content: '',
                   
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
        </div>
    )

}

export default CountryCreate