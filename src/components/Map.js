import React from "react";
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import AutoComplete from 'react-google-autocomplete';
import { Grid } from '@material-ui/core';
import youtube from './youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import styled from "styled-components"
import VideoDetail from './VideoDetail';

Geocode.setApiKey("AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM")



class Map extends React.Component{


        state = {


          videos:[],
          selectedVideo: null,
          foodvideos:[],
          foodselectedVideo: null,
          workvideos:[],
          workselectedVideo: null,

          dhksc: {},

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
      

        getCity = (addressArray) => {
          let city = '';
          for(let index=0; index<addressArray.length; index++) {
            if(addressArray[index].types[0]&&'administrative_area_level_2' === addressArray[index].types[0]) {
             city=addressArray[index].long_name;
             return city;
            }
          }
        }
      
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



       handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
          videos: response.data.items,
          selectedVideo:response.data.items[0] 
        });
        console.log("this is resp",response);
    };


    FoodhandleSubmit = async (termFromSearchBar) => {
      const response = await youtube.get('/search', {
          params: {
              q: 'food'+termFromSearchBar
          }
      })

      this.setState({
        foodvideos: response.data.items,
        foodselectedVideo:response.data.items[0] 
      });
      console.log("this is resp",response);
  };
    

  WorkhandleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get('/search', {
        params: {
            q: 'work'+termFromSearchBar
        }
    })

    this.setState({
      workvideos: response.data.items,
      workselectedVideo:response.data.items[0] 
    });
    console.log("this is resp",response);
};





       onPlaceSelected = (place) => {
        const address = place.formatted_address,
              addressArray = place.address_components,
               // plus
              dhksc = place.address_components[0].long_name,
              city = this.getCity(addressArray),
              area = this.getArea(addressArray),
              state = this.getState(addressArray),
              newLat = place.geometry.location.lat(),
              newLng = place.geometry.location.lng();
    
      //   const handleSubmit = async (termFromSearchBar) => {
      //     const response = await youtube.get('/search', {
      //         params: {
      //             q: termFromSearchBar
      //         }
      //     })
  
      //     this.setState({
      //       videos: response.data.items,
      //       selectedVideo:response.data.items[0] 
      //     });
      //     console.log("this is resp",response);
      // };
  
        
          // Set these values in the state.
          this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            dhksc: (dhksc) ? dhksc : '', 　　
            // plus
              markerPosition: {　
                  lat: newLat,
                  lng: newLng
              },
              mapPosition: {
                  lat: newLat,
                  lng: newLng
              },
          })
          
          this.handleSubmit(dhksc)
          this.FoodhandleSubmit(dhksc)
          this.WorkhandleSubmit(dhksc)
          console.log(place)
          console.log(dhksc)
          
       }


       
       
       
       handleVideoSelect = (video) => {
        this.setState({
            selectedVideo: video
        })
    }

    
    
     

   
    render(){
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

                  
                  <AutoComplete
                    types={['(country)']}
                    onPlaceSelected= {this.onPlaceSelected}
                    
                    style={{
                      width: '100%',
                      height: '40px',
                      paddingLeft: '16px',
                      marginTop: '2px',
                      marginBottom: '2rem'
                  }}
                  />
                </GoogleMap>
              ));


        return(
         <div>
          <MapWrapper>
           <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
         </MapWrapper>
         <VideoWrapper> 
            {/* <SearchBar handleFormSubmit={this.handleSubmit}/> */}
            <Grid justify="center"  container spacing={10} className="grid">
                <Grid item xs={10}>
                 <Grid  container spacing={8}>

                  <Grid item xs={6}>
                   <VideoDetail video={this.state.selectedVideo}/>
                  </Grid>

                  <Grid item xs={4}>
                   <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos} />
                  </Grid>

                 </Grid>
                </Grid>
            </Grid>
            </VideoWrapper> 

            <VideoWrapper> 
            {/* <SearchBar handleFormSubmit={this.handleSubmit}/> */}
            <Grid justify="center"  container spacing={10} className="grid">
                <Grid item xs={10}>
                 <Grid  container spacing={8}>

                  <Grid item xs={6}>
                   <VideoDetail video={this.state.foodselectedVideo}/>
                  </Grid>

                  <Grid item xs={4}>
                   <VideoList handleVideoSelect={this.FoodhandleVideoSelect} videos={this.state.foodvideos} />
                  </Grid>

                 </Grid>
                </Grid>
            </Grid>
            </VideoWrapper> 

            <VideoWrapper> 
            {/* <SearchBar handleFormSubmit={this.handleSubmit}/> */}
            <Grid justify="center"  container spacing={10} className="grid">
                <Grid item xs={10}>
                 <Grid  container spacing={8}>

                  <Grid item xs={6}>
                   <VideoDetail video={this.state.workselectedVideo}/>
                  </Grid>

                  <Grid item xs={4}>
                   <VideoList handleVideoSelect={this.WorkhandleVideoSelect} videos={this.state.workvideos} />
                  </Grid>

                 </Grid>
                </Grid>
            </Grid>
            </VideoWrapper> 
         </div>
          
        );
    }
}

export default Map;

const MapWrapper = styled.div`
height: 30vh;
position: relative;

`

const VideoWrapper = styled.div`
height: 200vh;
position: relative;
top:50vh;
`