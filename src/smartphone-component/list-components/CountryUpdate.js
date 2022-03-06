import {  useContext,useState , useEffect} from 'react';
import { AuthContext } from '../../shared-component/contexts/AuthContext';
import { API } from '../../shared-component/api';
import axios from "axios"
import { useParams } from "react-router"
import {useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from "styled-components"

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

// function to show preview image
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
            history.push(`/country-list`)
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
                    console.log(res.data)
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
        data.append('city_name', values.city_name)


        { file  ? (

        axios.put(API.countries.update(id), data, {
            headers: {
                "Authorization": `Token ${token}`,
               
            }
        })
            .then(res => {
                console.log(res.data)
                history.push(`/country-list`)
            })
            .finally(() => {
                setLoading(false)
            })
        ):( 
            setLoading(false)
            .then( history.push(`/countries/${country.id}/update`))   
        )}
    }

    // formik Api specification
    const formik = useFormik({
        initialValues: {
          country_image: "",
          country_name: country.country_name,
          city_name: country.city_name,
          content: country.content,
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
                    required
                    id="standard-required"
                    name="country_name"
                    label="CountryName"
                    defaultValue={country.country_name}
                    value={formik.values.country_name}
                    onChange={formik.handleChange}
                    error={formik.touched.country_name && Boolean(formik.errors.country_name)}
                    helperText={formik.touched.country_name && formik.errors.country_name}
                    variant="standard"
                    style={{ marginBottom: "10%", }}
                    />
                    <TextField
                    fullWidth
                    required
                    id="standard-required"
                    name="city_name"
                    label="CityName"
                    defaultValue={country.city_name}
                    value={formik.values.city_name}
                    onChange={formik.handleChange}
                    error={formik.touched.city_name && Boolean(formik.errors.city_name)}
                    helperText={formik.touched.city_name && formik.errors.city_name}
                    variant="standard"
                    style={{ marginBottom: "10%", }}
                    />
                    <TextField
                    fullWidth
                    required
                    id="standard-required"
                    name="content"
                    label="Content"
                    defaultValue={country.content}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}
                    variant="standard"
                    style={{ marginBottom: "15%", }}
                    />
                    <ImgUploadWrapper>
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
                    </ImgUploadWrapper>
                    <ThemeProvider theme={theme}>
                        <Button  color="neutral" variant="contained" fullWidth type="submit" sx={{ marginTop: 36}}>
                         Submit
                        </Button>
                    </ThemeProvider>       
                </form>
            </Card>
        </Container>
    )

}

export default CountryUpdate


const ImgUploadWrapper= styled.div`


margin-bottom: 20%;
display: flex;

`