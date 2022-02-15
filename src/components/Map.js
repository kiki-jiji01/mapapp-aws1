import React from "react";
import youtube from './youtube';
import VideoList from './VideoList';
import Geocode from "react-geocode";
import AutoComplete from 'react-google-autocomplete';
import {InfoWindow, withScriptjs, withGoogleMap, GoogleMap,Marker} from "react-google-maps";
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCircle, faCity, faUtensils} from '@fortawesome/free-solid-svg-icons';
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
                apiKey={"AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM"}
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

      <div>

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
                <p>Are you collecting the imfomation of the country<br></br> which you wanna live work....?</p>
                <h1>You can do everythings here</h1>
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

      <NavWrapper>
        <NavWrapper1>
          <NavWrapper2>
            <NavCityWrapper>
              <span>
                <FontAwesomeIcon icon={faCity} size="lg" mask={ faCircle } size="2x" transform="shrink-6"/>
              </span>
              <NavTextWrapper>City</NavTextWrapper>
            </NavCityWrapper>
            <NavWorkWrapper>
              <span>
                <FontAwesomeIcon icon={faBriefcase}  size="lg"  mask={ faCircle } size="2x" transform="shrink-6"/> 
              </span>
              <NavTextWrapper>Work</NavTextWrapper>
            </NavWorkWrapper>
            <NavFoodWrapper>
              <span>                     
                <FontAwesomeIcon icon={faUtensils}  size="lg"  mask={ faCircle } size="2x" transform="shrink-6"/>               
              </span>
              <NavTextWrapper>Food</NavTextWrapper>
            </NavFoodWrapper>
          </NavWrapper2>
        </NavWrapper1>
      </NavWrapper>

      <CityTitleWrapper>
      　<CityTitleWrapper1>
          <CityTitleWrapper2>             
            <h1>City</h1>          
          </CityTitleWrapper2> 
        </CityTitleWrapper1> 
      </CityTitleWrapper>

      <CityContentWrapper>
      　<CityContentWrapper1>
          <CityContentWrapper2>
            <p>The cityscape remains in your heart forever.  </p>
            <Border></Border>
          </CityContentWrapper2> 
        </CityContentWrapper1> 
      </CityContentWrapper>

      <VideoWrapper>
        <VideoImageWrapper>
          <VideoImageWrapper1>
            <h3>City</h3>
            <VideoImageWrapper2>
             <img src="https://images.unsplash.com/photo-1523304867125-2293c498e08a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGxvbmRvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" height="440vh" width="330vw" />
            </VideoImageWrapper2>
          </VideoImageWrapper1>
        </VideoImageWrapper> 
        <VideoItemsWrapper>
          <VideoItemsWrapper1>
           <VideoList  videos={this.state.videos} />
          </VideoItemsWrapper1>
        </VideoItemsWrapper>
      </VideoWrapper>

      <WorkTitleWrapper>
      　<WorkTitleWrapper1>
          <WorkTitleWrapper2>             
            <h1>Work</h1>          
          </WorkTitleWrapper2> 
        </WorkTitleWrapper1> 
      </WorkTitleWrapper>

      <WorkContentWrapper>
      　<WorkContentWrapper1>
          <WorkContentWrapper2>
            <p>Working make someones's life more exiting. </p>
            <Border></Border>
          </WorkContentWrapper2> 
        </WorkContentWrapper1> 
      </WorkContentWrapper>
  　　　　　　
      <VideoWrapper>
      <VideoItemsWrapper>
        <VideoItemsWrapper1>
          <VideoList  videos={this.state.workVideos} />
        </VideoItemsWrapper1>
      </VideoItemsWrapper>
      <VideoImageWrapper>
        <VideoImageWrapper1>
        <h3>Work</h3>
        <VideoImageWrapper2>
          <img src="https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjIyfHx3b3JraW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" height="440vh" width="330vw" />
        </VideoImageWrapper2>
        </VideoImageWrapper1>
      </VideoImageWrapper>
  　　</VideoWrapper>
      
      <FoodTitleWrapper>
      　<FoodTitleWrapper1>
        <FoodTitleWrapper2>             
          <h1>Food</h1>          
        </FoodTitleWrapper2> 
        </FoodTitleWrapper1> 
      </FoodTitleWrapper>

      <FoodContentWrapper>
      　<FoodContentWrapper1>
          <FoodContentWrapper2>
            <p>To eat is to color your life.</p>
            <Border></Border>
          </FoodContentWrapper2> 
        </FoodContentWrapper1> 
      </FoodContentWrapper>

      <VideoWrapper>
        <VideoImageWrapper>
          <VideoImageWrapper1>
            <h3>Food</h3>
          <VideoImageWrapper2>
            <img src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxmb29kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" height="440vh" width="330vw" />
          </VideoImageWrapper2>
            <p>Cityscape is one of the important elements for living there.
              You can feel the city you find here. </p>
          </VideoImageWrapper1>
        </VideoImageWrapper>
        <VideoItemsWrapper>
          <VideoItemsWrapper1>
            <VideoList  videos={this.state.foodVideos} />
          </VideoItemsWrapper1>
        </VideoItemsWrapper>
  　　</VideoWrapper>
        
      </div>
      
    );
    }
}

export default Map;

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
margin-top: 10vh;
margin-bottom: 5vh;
text-align: center;
color: white;

p{
    font-size: 36px;
    line-height: 120%;
    margin-bottom: 8vh;
}

h1{
    // margin-top: 5vh;
    font-size: 48px;
}
`


const MapWrapper= styled.div`
position: relative;
margin: -5% 20% 10% 20%;
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


const NavWrapper = styled.div`


width: 100%;
display: block;
border-top: 1px solid rgba(0,0,0,.15);
position: -webkit-sticky;
position: sticky;
top: 8.5vh;
`

const NavWrapper1= styled.div`

margin-left: 5vw;
// position: -webkit-sticky;
// position: sticky;
// top: 0;
span{
  
}
`

const NavWrapper2= styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
sapn{
  margin-right: 0.5vw;
}
`

const NavCityWrapper= styled.div`
background-color: hsla(0,0%,100%,.8);
color: rgba(0, 0, 0, 0.9);
font-family: "MaisonNeue-Medium","Helvetica Neue",Helvetica,Arial,sans-serif;
display: flex;
text-transform: none;
font-size: 14px;
line-height: 24px;
letter-spacing: 0;



// ::after{
//   content: "|";
//     margin-left: 10px;
//     margin-right: 8px;
//     color: rgba(0,0,0,.45);

// }
`

const NavWorkWrapper= styled(NavCityWrapper)`

`

const NavFoodWrapper= styled(NavCityWrapper)`

`


const NavTextWrapper= styled.div`
margin-left: 1vw;
margin-right: 3vw;

`


const CityTitleWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;
margin-top: 10vh;
`

const CityTitleWrapper1 = styled.div`

margin-left: 30%;
margin-right: 30%;
position: relative;
padding: 0 12px;

`


const CityTitleWrapper2 = styled.div`
margin-bottom: 5vh;
display: flex;
flex-direction: column;
align-items: center;

::before{
  content: '';
  height: 1px;
  margin-bottom: 1vh;
  width: 60%;
  background-color: black;
  display: block;
}

::after{
  margin-top: 1vh;
  width: 60%;
  content: '';
  height: 1px;
  display: block;
  background-color: #000;

}
`

const CityContentWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;

`

const CityContentWrapper1 = styled.div`

font-size: 24px;
margin-right: 60%;
position: relative;
padding: 0 48px;


`

const CityContentWrapper2 = styled.div`

margin-bottom: 5vh;
display: flex;
flex-direction: column;
align-items: center;
`

const Border = styled.div`

height: 4px;
background-color: #000;
font-size: 0;
line-height: 0;
width: 10vw;
margin-top: 5%;
margin-left: -20%;
`


const WorkTitleWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;

`
const WorkTitleWrapper1 = styled(CityTitleWrapper1)`

`


const WorkTitleWrapper2 = styled(CityTitleWrapper2)`

`

const WorkContentWrapper= styled(CityContentWrapper)`

`

const WorkContentWrapper1= styled.div`

font-size: 24px;
margin-left: 60%;
position: relative;
padding: 0 48px;

`

const WorkContentWrapper2= styled(CityContentWrapper2)`

`

const FoodTitleWrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;

`

const FoodTitleWrapper1 = styled(CityTitleWrapper1)`

`


const FoodTitleWrapper2 = styled(CityTitleWrapper2)`

`


const FoodContentWrapper= styled(CityContentWrapper)`

`

const FoodContentWrapper1= styled(CityContentWrapper1)`

`

const FoodContentWrapper2= styled(CityContentWrapper2)`

`

const VideoWrapper = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20vh;
// margin-top: 20vh;
`


const VideoImageWrapper = styled.div`
width: 50vw;
background-color: #F8F8F8;


p{
  margin-top: 10vh;
  width: 80%;
}
`

const VideoImageWrapper1 = styled.div`
padding: 10% 5% 10% 10%;
display: flex;
text-align: center;
align-items: center;
flex-direction: column;
`

const VideoImageWrapper2 = styled.div`

height: 100%;
object-fit: contain;
// background: url("https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
`

const VideoItemsWrapper = styled.div`
width: 50vw;
background-color: white;

`

const VideoItemsWrapper1 = styled.div`
margin-right: 32px;
margin-left: 32px;
width: 100%;

`
