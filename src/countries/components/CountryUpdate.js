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
import { useParams } from "react-router"
import Card from '@mui/material/Card';
import styled from "styled-components"
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
                <img src={imageSrc}  alt={file.name} style={{ marginLeft: "14px", width:"50px",height:"50px", objectFit:"cover", borderRadius:"50%", objectPosition:"0px 0px"}}/>
            )}
        </div>
    )
}




export function CountryUpdate() {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [loadingCountry, setLoadingCountry] = useState(false)
    const [file, setFile] = useState(null)
    const [country, setCountry] = useState("")
    const { id } = useParams()
    const { user: { token } } = useContext(AuthContext)

    const theme = createTheme({
        palette: {
          neutral: {
            main: "#212121",
            contrastText: '#fff',
          },
        },
      });

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

    console.log(country.country_name)




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

   
    const formik = useFormik({
        initialValues: {
          country_image: "",
          country_name: "",
          content: "",
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
      });
    

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "20vh"}}>
            <Card sx={{ maxWidth: 345, padding: 10 }}>
            {loading && "Loading..."}
            <form onSubmit={formik.handleSubmit}>
                <TextField
                fullWidth
                id="country_name"
                name="country_name"
                label={country.country_name}
                value={formik.values.country_name}
                onChange={formik.handleChange}
                error={formik.touched.country_name && Boolean(formik.errors.country_name)}
                helperText={formik.touched.country_name && formik.errors.country_name}
                
                style={{ marginBottom: "10%", }}
                />
                <TextField
                fullWidth
                id="content"
                name="content"
                label={country.content}
                // type="password"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                style={{ marginBottom: "15%", }}
                />
                <ImgUpload>
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
                </ImgUpload>
                <ThemeProvider theme={theme}>
                    <Button  color="neutral" variant="contained" fullWidth type="submit" sx={{ marginTop: 36}}>
                    Submit
                    </Button>
                </ThemeProvider>
                
            </form>
            </Card>
           
        </Container>
        // <div>
        //     {loading && "Submitting..."}
        //     {loadingCountry && "Fetching Country Details..."}
        //     {country && (
        //         <Formik
        //             initialValues={{
        //                 country_image:country.country_image,
        //                 country_name: country.country_name,
        //                 content: country.content,
                       
        //             }}
        //             validate={values => { 
        //                 const errors = {};
        //                 if (!values.country_name) {
        //                   errors.country_name = 'country_nameを入力してください' 
        //                 }
        //                 if (!values.content) {
        //                     errors.content = 'contentを入力してください' 
        //                   }
        //                 // if (!values.country_image) {
        //                 // errors.country_image = 'contentを入力してください' 
        //                 // }
        //                 return errors;
        //               }}
                      
        //             onSubmit={handleSubmit}>

        //             {({ errors, touched }) => (
        //                 <Form>
        //                     <label htmlFor="country_name">country_name</label>
        //                 <Field id="country_name" name="country_name" placeholder="Japan" />
        //                 {touched.country_name && errors.country_name && <div>{errors.country_name}</div>}

        //                 <label htmlFor="content">content</label>
        //                 <Field id="content" name="content" placeholder="Cook" />
        //                 {touched.content && errors.content && <div>{errors.content}</div>}

                        
        //                 <div >
        //                     <label >
        //                         <span >country_image</span>
        //                         <input
        //                         onChange={e => setFile(e.target.files[0])}
        //                         type="file"
                               
        //                         />
        //                     </label>
        //                     {file && (
        //                         <ImagePreview file={file} />
        //                     )}
        //                 </div>

                       


        //                 <button type="submit">Submit</button>
        //                 </Form>
        //             )}

        //         </Formik>
        //     )}
        // </div>
    )

}

export default CountryUpdate


const ImgUpload= styled.div`


margin-bottom: 20%;
display: flex;

`