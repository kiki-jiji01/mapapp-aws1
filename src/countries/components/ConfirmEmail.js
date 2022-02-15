import { useState } from 'react';
import { API } from '../api'
import axios from "axios"
import { useParams } from "react-router"
import Container from '@mui/material/Container';
import Button from '@material-ui/core/Button';



 function ConfirmEmail() {
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
        <Container component="main" maxWidth="xs" sx={{ marginTop: "40vh"}}>
            <div style={{ marginBottom:" 10vh", textAlign: "center", backgroundColor:"#a9927d", color: "white", fontSize: "16px"}}>
            {success && 
              "Your email has been velified. You can now login"
            }
            </div>
            {loading && "Loading..."}
            <Button  variant="contained" fullWidth type="submit" onClick = {handleSubmit}>
                Submit
            </Button>
        </Container>
    )

}

export default ConfirmEmail