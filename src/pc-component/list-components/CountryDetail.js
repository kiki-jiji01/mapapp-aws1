import React,{ useEffect, useState ,useContext} from "react"
import { API } from "../../shared-component/api"
import { AuthContext } from '../../shared-component/contexts/AuthContext';
import axios from "axios"
import { useParams } from "react-router"
import {useHistory} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Modal, Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from "styled-components"



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const textstyles = {
  "&.MuiButton-root": {
   
  },
  "&.MuiButton-text": {
    color: "black",
    
    
  },
  "&.MuiButton-contained": {
    color: "yellow"
  },
  "&.MuiButton-outlined": {
    color: "brown"
  },
  marginRight: "-12px"

};



 function CountryDetail() {
    const [country, setCountry] = useState(null)
    const { id } = useParams()
    const { user: { token } } = useContext(AuthContext)
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // defining style of Button
    const theme = createTheme({
      palette: {
        neutral: {
          main: "#bdbdbd",
          contrastText: '#fff',
        },
      },
    });

    useEffect(() => {
      function  fetchCountry() {
        axios.get(API.countries.retrieve(id),{
          headers: {
            "Authorization": `Token ${token}`
        }
        })
          .then(res => {
            setCountry(res.data)
          })
      }
      fetchCountry()
      return () => null
    }, [id, token])


    function handleSubmit(e) {
      e.preventDefault()
    
      axios.delete(API.countries.delete(id), {
          headers: {
              "Authorization": `Token ${token}`
          }
      })
          .then(()=> {
              history.push(`/country-list`)
          })
    }

    return (
        
      <DetailWrapper>
      {country && (
      <Grid container spacing={2}>

        <Grid item xs={5}  style={{height: "80vh", paddingLeft: "16px", paddingRight:"16px"}}>
         {country.country_image && (
            <CountryImgWrapper>
                <img   
                src={country.country_image}  
                alt={country.country_image} 
                style={{objectFit:'cover', objectPosition: "center" , width: "100%" ,height: "100%"}}   
                />
            </CountryImgWrapper>  
          )}
        </Grid>

        <Grid item xs={7}  style={{height: "72vh", position: "relative"}}>
            <CountryDetailWrapper>
              <CountryDetailWrapper1>
                <CountryNameWrapper>
                  <h1>{country.country_name}  -  {country.city_name}</h1>
                </CountryNameWrapper>
                <Border></Border>
                <CountryContentWrapper>
                  <h3>{country.content}</h3>
                </CountryContentWrapper>
                {country.is_owner&& (
                <EditWrapper>
                  <ThemeProvider theme={theme}>
                  <Button  color="neutral" sx={{ marginRight: "36px" }} variant="contained"  onClick = {() => history.push(`/countries/${country.id}/update`)}>
                      Update
                  </Button>
                  <Button  color="neutral" sx={{  marginRight: "12px" }} variant="contained"  onClick ={handleOpen}>
                    Delete
                  </Button>
                  </ThemeProvider>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <Button sx={textstyles}  variant="text" fullWidth type="submit" onClick = {handleSubmit}>
                          Are you sure for deleteing this list?
                        </Button>
                        </Box>
                    </Modal>
                </EditWrapper>
                )}
              </CountryDetailWrapper1>
            </CountryDetailWrapper>
        </Grid>

      </Grid>
      )}
      </DetailWrapper>
     
    )
}

export default CountryDetail



const DetailWrapper = styled.div`
margin-top: 20vh;
height: 100vh;
width: 100vw;
`


const CountryImgWrapper = styled.div`
height: 100%;
width: 100%;
overflow: hidden;
`


const CountryDetailWrapper = styled.div`
padding: 10% ;
display: flex;
text-align: center;
flex-direction: column;
`


const CountryDetailWrapper1 = styled.div`
margin-left: 20%;
position: absolute;
`

const CountryNameWrapper = styled.div`
text-align: left;
`


const CountryContentWrapper = styled.div`
margin-bottom: 300px;
text-align: left;
`


const EditWrapper = styled.div`
display: flex;
`


const Border = styled.div`
height: 20px;
background-color: rgba(192,192,192,0.8);
font-size: 0;
line-height: 0;
width: 40vw;
margin-bottom: 15vh;
align-items: flex-end;
`



