import { Formik, Field, Form } from 'formik';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios"
import { API } from '../api'
import {  useContext,useState , useEffect} from 'react';
import { AuthContext } from "../contexts/AuthContext";
import {useHistory} from 'react-router-dom';
import * as yup from 'yup';
import Container from '@mui/material/Container';

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

const validationSchema = yup.object({
    country_name: yup
      .string('Enter your country_name'),
    //   .email('Enter a valid country_name')
    //   .required('country_name is required'),
    content: yup
      .string('Enter your content')
    //   .min(8, 'content should be of minimum 8 characters length')
    //   .required('content is required'),
  });



export function CountryCreate() {
    const [loading, setLoading] = useState(false)
    const { user: { token } } = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const history = useHistory();


    const handleSubmit = function handleSubmit(values) {
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


    const formik = useFormik({
        initialValues: {
          country_image: '',
          country_name: '',
          content: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
      });
    


    

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "20vh"}}>
            {loading && "Loading..."}
            <form onSubmit={formik.handleSubmit}>
                <TextField
                fullWidth
                id="country_name"
                name="country_name"
                label="country_name"
                value={formik.values.country_name}
                onChange={formik.handleChange}
                error={formik.touched.country_name && Boolean(formik.errors.country_name)}
                helperText={formik.touched.country_name && formik.errors.country_name}
                />
                <TextField
                fullWidth
                id="content"
                name="content"
                label="content"
                // type="password"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                />
                <Button  variant="contained" component="label" sx={{ marginTop: 36}}>
                    Image Upload
                    <input
                    onChange={e => setFile(e.target.files[0])}
                    type="file"
                    style={{display:'none'}}   
                />
                </Button>
                {file && (
                    <ImagePreview file={file} />
                )}
                <Button  variant="contained" fullWidth type="submit" sx={{ marginTop: 36}}>
                Submit
                </Button>
            </form>
           
        </Container>
    )

}

export default CountryCreate