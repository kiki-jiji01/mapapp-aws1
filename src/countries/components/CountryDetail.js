import axios from "axios"
import { useEffect, useState ,useContext} from "react"
import { useParams } from "react-router"
import { API } from "../api"
import {useHistory, NavLink} from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext"
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styled from "styled-components"
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal, Box } from "@mui/material";
import React from "react";


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



export function CountryDetail() {
    const [country, setCountry] = useState(null)
    const { id } = useParams()
    const { user: { token } } = useContext(AuthContext)
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
            console.log(res.data)
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
          .then(res => {
              history.push(`/countries`)
          })
  }

    return (
        
      <Detail>
      {country && (
      <Grid container spacing={2}>
        <Grid item xs={5}  style={{height: "80vh", paddingLeft: "16px", paddingRight:"16px"}}>
         {country.country_image && (
            <CountryImg>
                <img   
                src={country.country_image}  
                alt={country.country_image} 
                style={{objectFit:'cover', objectPosition: "center" , width: "100%" ,height: "100%"}}   
                />
            </CountryImg>  
          )}
        </Grid>
        <Grid item xs={7}  style={{height: "72vh", position: "relative"}}>
            <CountryContent>
              <NameContent>
                 <h1>{country.country_name}</h1>
              </NameContent>
              <Border></Border>
              <ContentContent>
                <p>{country.content}</p>
              </ContentContent>
              {country.is_owner&& (
              <Edit>
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
              </Edit>
              )}
            </CountryContent>
        </Grid>
      </Grid>
      )}
      </Detail>
     
     
            //   {country.is_owner && (
            //   <div>
            //   <NavLink to={`/countries/${country.id}/update`}>
            //  Update
            //   </NavLink>
            //   <NavLink to={`/countries/${country.id}/delete`}>
            //  Delete
            //   </NavLink>
            //   </div>
            //   )}
         
          
      
           
        
    )
}

export default CountryDetail


const Detail = styled.div`

margin-top: 20vh;
height: 100vh;
width: 100vw;
`

const Img = styled.div`


`

const CountryImg = styled.div`
height: 100%;
width: 100%;
overflow: hidden;
padding-right: 96px;
padding-left: 64px;
`

const CountryImg1 = styled.div`

`

const CountryContent = styled.div`

padding: 10% ;
margin-right: 20%;
display: flex;
text-align: center;
flex-direction: column;
`

const NameContent = styled.div`

padding: 2% 10% ;

`

const ContentContent = styled.div`
margin-bottom: 5vh;

`

const Edit = styled.div`
display: flex;
position: absolute;
bottom: 0;
margin-left: 20%;
`
const Border = styled.div`
align-self: end;
height: 20px;
background-color: rgba(192,192,192,0.8);
font-size: 0;
line-height: 0;
width: 40vw;
margin-bottom: 15vh;
margin-right: -50%;
align-items: flex-end;
`



