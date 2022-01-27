
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
import Card from '@mui/material/Card';
import styled from "styled-components"
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

    const theme = createTheme({
        palette: {
          neutral: {
            main: "#212121",
            contrastText: '#fff',
          },
        },
      });


    const handleSubmit = function handleSubmit(values) {
        console.log(values)
        setLoading(true)
        const data = new FormData()
        data.append('country_image', file)
        data.append('content', values.content)
        data.append('country_name', values.country_name)
        data.append('city_name', values.city_name)

        {file ? (

        axios.post(API.countries.create, data,{
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                history.push(`/country-list`)
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
          city_name: '',
          content: '',
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
                label="country_name"
                value={formik.values.country_name}
                onChange={formik.handleChange}
                error={formik.touched.country_name && Boolean(formik.errors.country_name)}
                helperText={formik.touched.country_name && formik.errors.country_name}
                style={{ marginBottom: "10%", }}
                />
                <TextField
                fullWidth
                id="city_name"
                name="city_name"
                label="city_name"
                value={formik.values.city_name}
                onChange={formik.handleChange}
                error={formik.touched.city_name && Boolean(formik.errors.city_name)}
                helperText={formik.touched.city_name && formik.errors.city_name}
                style={{ marginBottom: "10%", }}
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
                    <Button color="neutral" variant="contained" fullWidth type="submit" sx={{ marginTop: 36}}>
                    Submit
                    </Button>
                </ThemeProvider>
               
            </form>
            </Card>
        </Container>
    )

}

export default CountryCreate


const ImgUpload= styled.div`


margin-bottom: 20%;
display: flex;

`