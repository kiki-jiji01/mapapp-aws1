import { useState } from 'react';
import { useParams } from "react-router"
import axios from "axios"
import { API } from '../api'
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export function ConfirmEmail() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { key } = useParams()

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        axios.post(API.auth.verifyEmail, {key})
            .then(res => {
                setSuccess(true)
            })
            .finally(() => setLoading(false))
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "20vh"}}>
            {success && "Your email has been verified! You can now login"}
            {loading && "Loading..."}
            <Button  variant="contained" fullWidth type="submit" onClick = {handleSubmit}>
                Submit
            </Button>
        </Container>
    )

}

export default ConfirmEmail