import { useState,useContext } from 'react';
import { API } from '../api'
import { AuthContext } from '../contexts/AuthContext'
import axios from "axios"
import {useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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

 function Login() {
    const [loading, setLoading] = useState(false)
    const { login } = useContext(AuthContext)
    const history = useHistory();

   function handleSubmit(values) {
        setLoading(true)
        axios.post(API.auth.login, values)
            .then(res =>  login(res.data.key))
            .then(res => {
                history.push(`/country-list`)
            })
            .finally(() => setLoading(false))
        return () => null
    }

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
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
                id="email"
                name="email"
                label="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                fullWidth
                id="password"
                name="password"
                label="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />
                <Button  variant="contained" fullWidth type="submit" sx={{ marginTop: 36}}>
                Submit
                </Button>
            </form>
           
        </Container>
    )

}

export default Login