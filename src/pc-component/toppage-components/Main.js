import React from "react";
import youtube from './youtube';
import NavBar from "./NavBar";
import City from "./City";
import Work from "./Work";
import Food from "./Food";
import Geocode from "react-geocode";
import AutoComplete from 'react-google-autocomplete';
import {InfoWindow, withScriptjs, withGoogleMap, GoogleMap,Marker} from "react-google-maps";
import styled from "styled-components";


Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY)



class Main extends React.Component{


        state = {

          videos:[],
          foodVideos:[],
          workVideos:[],
          placeName: "",
          address :"",
          zoom :"15",
          height :"400",
          mapPosition : {
            lat:0,
            lng:0,
          },
          markerPosition :{
            lat:0,
            lng:0,
          },
        }

        // Get Current location and set to state
        componentDidMount() {
          if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( position => {
              this.setState({
                mapPosition :{
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                markerPosition: {
                  lat:position.coords.latitude,
                  lng:position.coords.longitude,
                }
              },() => {
                Geocode.fromLatLng(position.coords.latitude,position.coords.longitude)
                .then(response => {
                 const address = response.results[0].formatted_address;         
                 this.setState({
                    address : (address) ? address : "",
                  })
                })
              })
            })
          }
        }
               
        // Function when the marker in map draged
        onMarkerDragEnd= (event) => {
          let newLat = event.latLng.lat();
          let newLng = event.latLng.lng();
     
          Geocode.fromLatLng(newLat,newLng)
          .then(response => {
           const address = response.results[0].formatted_address;
             this.setState({
               address : (address) ? address : "",
               markerPosition: {
                 lat:newLat,
                 lng:newLng
               },
               mapPosition: {
                 lat:newLat,
                 lng:newLng
               }
             })
          })
        }

        // get the youtube data related to City
        cityHandleSubmit = async (termFromSearchBar) => {
            const response = await youtube.get('/search', {
                params: {
                    q: termFromSearchBar
                }
            })
            this.setState({
              videos: response.data.items,
            });
            console.log("this is resp",response);
        };


         // get the youtube data related to Food
        foodHandleSubmit = async (termFromSearchBar) => {
          const response = await youtube.get('/search', {
              params: {
                  q: 'food'+termFromSearchBar
              }
          })
          this.setState({
            foodVideos: response.data.items,
          });
          console.log("this is resp",response);
        };
    
         // get the youtube data related to Work
        workHandleSubmit = async (termFromSearchBar) => {
          const response = await youtube.get('/search', {
              params: {
                  q: 'work'+termFromSearchBar
              }
          })
          this.setState({
            workVideos: response.data.items,
          });
          console.log("this is resp",response);
          console.log(this.state.workVideos);
        };




        // function when user selected place in the searchbox
        onPlaceSelected = (place) => {
        const address = place.formatted_address,
              placeName = place.address_components[0].long_name,
              newLat = place.geometry.location.lat(),
              newLng = place.geometry.location.lng();
          
          this.setState({
            address: (address) ? address : '',
            placeName: (placeName) ? placeName : '',         
            markerPosition: {
                lat: newLat,
                lng: newLng
            },
            mapPosition: {
                lat: newLat,
                lng: newLng
            },
          })
          this.cityHandleSubmit(placeName)
          this.foodHandleSubmit(placeName)
          this.workHandleSubmit(placeName)
        }


     
    render(){

      // Defining GoogleMap
      const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
          defaultZoom={4}
          defaultCenter={{ lat: this.state.mapPosition.lat , lng: this.state.mapPosition.lng }}
        >
          <Marker
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{ lat: this.state.markerPosition.lat , lng: this.state.markerPosition.lng}}
          >
            <InfoWindow>
              <div>
                {this.state.address}
              </div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      ));

      // Defining SearchBox
      const SearchBox = withScriptjs(withGoogleMap(props =>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: this.state.mapPosition.lat , lng: this.state.mapPosition.lng }}
        >
          <AutoComplete
                apiKey={process.env.REACT_APP_GEOCODE_API_KEY}
                types={['(country)']}
                onPlaceSelected= {this.onPlaceSelected}
                className="pac-target-input" 
                placeholder="Enter a location" 
                autocomplete="new-password"
                style={{
                  width: '50%',
                  padding: '8px',
                  marginTop: '180px',
                  marginBottom: '2rem',
                  zIndex: '1100',
                  fontWeight:'600',
                  outlineStyle: "none",
                  // borderRadius: "30px"
                }}
           /> 
        </GoogleMap>
      ));


    return(

      <MainWrapper> 
        <MainWrapper1>

          <TopPageWrapper>
            <TopPageWrapper1>
            　<video  
              autoPlay
              muted
              loop
              src="https://assets.mixkit.co/videos/preview/mixkit-venice-central-canal-at-night-4646-large.mp4"
            　style={{position:"absolute",
                      top:0,
                      left:0,
                      bottom: 0,
                      right: 0, 
                      overflow: "hidden", 
                      objectPosition: "center",
                      zIndex:-1000, 
                      objectFit:"cover", 
                      width: "100%", 
                      height: "100%"
                    }}
              >
              </video>
              <AboveVideoWrapper>
                  <TextWrapper>
                    <p>Are you collecting the imfomation of the country<br></br> which you wanna live, work....?</p>
                    <h1>Then, You are Perfect.</h1>
                  </TextWrapper>
                  <SearchBox
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div />}
                  containerElement={<div/>}
                  mapElement={<div style={{ height: `100%` ,display:"none"}} />}
                  />
              </AboveVideoWrapper>
            </TopPageWrapper1>
          </TopPageWrapper>

          <MapWrapper>
              <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `70vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              />
          </MapWrapper>

          <Margin></Margin>
          
          <NavBar/>

          <City videos={this.state.videos}/>

          <Work videos={this.state.workVideos}/>

          <Food videos={this.state.foodVideos}/>
      
        </MainWrapper1>
      </MainWrapper>
      
    );
    }
}

export default Main;



const MainWrapper = styled.div`
position: relative;
`


const MainWrapper1 = styled.div`
top:0;
width: 100vw;
box-sizing: border-box;
`


const TopPageWrapper = styled.div`
margin-bottom:150px;
position: relative;
height: 100vh;

`


const TopPageWrapper1 = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
position: relative;

`


const AboveVideoWrapper = styled.div`
display: flex;
flex-direction: column;
max-width: 640px;
text-align:center;
position: absolute;
top: 50%;
left: 50%;
z-index: 20;
transform: translate(-50%, -50%);
-webkit-transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
width: 80%;
p{
  color: white;
}
`


const TextWrapper = styled.div`
margin-top: 40px;
margin-bottom: 5vh;
text-align: center;
color: white;

p{
    font-size: 24px;
    line-height: 120%;
    margin-bottom: 10vh;
    letter-spacing: -1px;
}

h1{
    font-family: 'DDINExpRegular';
    font-size: 64px;
    padding-top: 10px;
}
`


const MapWrapper= styled.div`
position: relative;
background-color: rgba(239,239,239,.85);
position: relative;
z-index: 100;
text-align: center;
`


const Margin = styled.div`
height: 150px;
`


