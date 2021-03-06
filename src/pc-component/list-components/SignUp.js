import { useState } from 'react';
import { API } from '../../shared-component/api';
import axios from "axios"
import { useFormik } from 'formik';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password1: yup
      .string('Enter your password')
      .min(8, 'password should be of minimum 8 characters length')
      .required('password is required'),
    password2: yup
      .string('Enter your password')
      .min(8, 'password should be of minimum 8 characters length')
      .required('password is required'),
  });

 function Signup() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    
    function handleSubmit(values, { resetForm }) {
        setLoading(true)
        axios.post(API.auth.signup, values)
            .then(()=> {
                resetForm()
                setSuccess(true)
            })
            .finally(() => setLoading(false))
    }

    const formik = useFormik({
        initialValues: {
          email: '',
          password1: '',
          password2: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
      });


    return (
        <div>
            {loading && "Loading..."}
            
            <Container component="main" maxWidth="xs" sx={{ marginTop: "40vh"}}>
            <div style={{ marginBottom:" 10vh", textAlign: "center", backgroundColor:"#a9927d", color: "white", fontSize: "18px"}}>
            {success && 
              "You will receive a verification email."
            }
            </div>
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
                id="password1"
                name="password1"
                label="password1"
                type="password1"
                value={formik.values.password1}
                onChange={formik.handleChange}
                error={formik.touched.password1 && Boolean(formik.errors.password1)}
                helperText={formik.touched.password1 && formik.errors.password1}
                />
                <TextField
                fullWidth
                id="password2"
                name="password2"
                label="password2"
                type="password2"
                value={formik.values.password2}
                onChange={formik.handleChange}
                error={formik.touched.password2 && Boolean(formik.errors.password2)}
                helperText={formik.touched.password2 && formik.errors.password2}
                />
                <Button  variant="contained" fullWidth type="submit" sx={{ marginTop: 36}}>
                Submit
                </Button>
            </form>
           
        </Container>
        </div>
    )

}

export default Signup