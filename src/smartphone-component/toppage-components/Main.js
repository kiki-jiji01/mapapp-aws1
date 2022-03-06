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
                  width: '80%',
                  padding: '8px',
                  marginBottom: '100px',
                  zIndex: '1100',
                  fontWeight:'600',
                  outlineStyle: "none",
                  // borderRadius: "30px",
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
                    <p style={{ fontSize: "32px" }}>Let's find all imfomation <br/>of the country, here.</p>
                    <p style={{ fontFamily:'DDINExpRegular', lineHeight: "34px", letterSpacing: "1px"}}>-- CITY,FOOD,WORK --</p>
                  </TextWrapper>
              </AboveVideoWrapper>
            </TopPageWrapper1>
          </TopPageWrapper>
          
          <SearchBox
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{textAlign: "center"}}/>}
                  containerElement={<div style={{textAlign: "center"}}/>}
                  mapElement={<div style={{ height: `100%` ,display:"none"}} />}
          />

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

export default Map;



const MainWrapper = styled.div`
position: relative;
`


const MainWrapper1 = styled.div`
top:0;
width: 100vw;
box-sizing: border-box;
`


const TopPageWrapper = styled.div`
margin-bottom:100px;
position: relative;
height: 100vh;
margin-top: -270px;
`


const TopPageWrapper1 = styled.div`
height: 100vh;
position: relative;
`


const AboveVideoWrapper = styled.div`
padding-top: 200px;
margin-top: 300px;
text-align:center;
z-index: 20;

p{
  color: white;
}
`


const TextWrapper = styled.div`
margin-top: 20px;
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


