import React from "react";
import youtube from './youtube';
import NavBar from "./NavBar";
import City from "./City";
import Work from "./Work";
import Food from "./Food";
import Geocode from "react-geocode";
import AutoComplete from 'react-google-autocomplete';
import {InfoWindow, withScriptjs, withGoogleMap, GoogleMap,Marker} from "react-google-maps";
import ReactPlayer from 'react-player';
import styled from "styled-components";


Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY)



class Map extends React.Component{


        state = {

          videos:[],
          foodVideos:[],
          workVideos:[],
          placeName: "",
          address :"",
          city :"",
          area :"",
          state :"",
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
      
                 const address = response.results[0].formatted_address,
                       addressArray = response.results[0].address_components,
                       city = this.getCity(addressArray),
                       area = this.getArea(addressArray),
                       state = this.getState(addressArray);
      
                 this.setState({
                    address : (address) ? address : "",
                    city : (city) ? city: "",
                    area : (area) ? area: "",
                    state: (state)? state: "",
                  })
                })
              })
            })
          }
        }
        
        // get the current city
        getCity = (addressArray) => {
          let city = '';
          for(let index=0; index<addressArray.length; index++) {
            if(addressArray[index].types[0]&&'administrative_area_level_2' === addressArray[index].types[0]) {
             city=addressArray[index].long_name;
             return city;
            }
          }
        }
        // get the current are
        getArea=(addressArray) => {
          let area = '';
          for(let index=0; index<addressArray.length; index++) {
            if(addressArray[index].types[0]){
              for(let j =0; j<addressArray.length; j++) {
                if('sublocalty_level_1' === addressArray[index].types[j] || 'localty' ===addressArray[index].types[j]) {
              area = addressArray[index].long_name;
              return area;
              }
              }
            }
          }
        }
         // get the current state
        getState =(addressArray) => {
          let state = '';
          for(let index=0; index<addressArray.length; index++) {
            for(let index=0; index<addressArray.length; index++) {
              if(addressArray[index].types[0] && 'administrative_area_level_1' ===addressArray[index].types[0]) {
                state = addressArray[index].long_name;
                return state;
              }
            }
          }
        }

        // Function when the marker in map draged
        onMarkerDragEnd= (event) => {
          let newLat = event.latLng.lat();
          let newLng = event.latLng.lng();
     
          Geocode.fromLatLng(newLat,newLng)
          .then(response => {
           console.log('response', response)
           const address = response.results[0].formatted_address,
                 addressArray = response.results[0].address_components,
                 city = this.getCity(addressArray),
                 area = this.getArea(addressArray),
                 state = this.getState(addressArray);
     
             this.setState({
               address : (address) ? address : "",
               city : (city) ? city: "",
               area : (area) ? area: "",
               state: (state)? state: "",
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
        };




        // function when user selected place in the searchbox
        onPlaceSelected = (place) => {
        const address = place.formatted_address,
              addressArray = place.address_components,
              placeName = place.address_components[0].long_name,
              city = this.getCity(addressArray),
              area = this.getArea(addressArray),
              state = this.getState(addressArray),
              newLat = place.geometry.location.lat(),
              newLng = place.geometry.location.lng();
          
          this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
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
          defaultZoom={8}
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
                  width: '30%',
                  height: '40px',
                  paddingLeft: '16px',
                  marginTop: '20vh',
                  marginBottom: '2rem',
                  zIndex: '1100',
                  borderRadius: "30px",
                  outlineStyle: "none",
                
                }}
           /> 
        </GoogleMap>
      ));


    return(

      <MainWrapper> 
        <MainWrapper1>

          <TopPageWrapper>
            <TopPageWrapper1>
              <BackGroundVideoWrapper>
                <ReactPlayer 
                url="https://assets.mixkit.co/videos/preview/mixkit-venice-central-canal-at-night-4646-large.mp4"
                playing={true}
                autoPlay={true}
                muted={true}
                loop={true}
                width='100%'
                height='100%'
                zindex="-100"
                />
              </BackGroundVideoWrapper>
              <AboveVideoWrapper>
                  <TextWrapper>
                    <p>Are you collecting the imfomation of the country<br></br> which you wanna live, work....?</p>
                    <h1>OK. You can do everythings here.</h1>
                  </TextWrapper>
                  <SearchBox
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div />}
                  containerElement={<div/>}
                  mapElement={<div style={{ height: `100%` ,display:"none"}} />}
                  />
              </AboveVideoWrapper>
            </TopPageWrapper1>
            <MapWrapper>
              <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `60vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              />
            </MapWrapper>
          </TopPageWrapper>

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

export default Map;

const MainWrapper = styled.div`

// height: 100%;
position: relative;
`


const MainWrapper1 = styled.div`

position: absolute;
top:0;
width: 100vw;
box-sizing: border-box;
`


const TopPageWrapper = styled.div`
margin-bottom:10vh;
position: relative;
height: 100vh;
display: flex;
-webkit-flex-direction: column;
flex-direction: column;
`


const TopPageWrapper1 = styled.div`
position: relative;
padding-top: 56.212%;
width: 100%;
`

const BackGroundVideoWrapper = styled.div`
position: absolute;
top: 0;
left: 0;
bottom: 0;
right: 0;
overflow: hidden;
width: 100%;
height: 100%;
object-position: center;
z-index: -1000;
object-fit: cover;

::before{
  　content: "";
    position: absolute;
    background-color: rgba(0,0,0,.3);
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
`

const AboveVideoWrapper = styled.div`

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
margin-top: 20vh;
margin-bottom: 5vh;
text-align: center;
color: white;

p{
    font-size: 28px;
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
margin: -2% 20% 10% 20%;
background-color: rgba(239,239,239,.85);
position: relative;
z-index: 100;
text-align: center;
display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
`

const Margin = styled.div`

height: 50vh;
`


