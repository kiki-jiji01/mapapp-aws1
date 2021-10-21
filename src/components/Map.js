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
import Dashboard from "./Dashboard";
import zIndex from "@material-ui/core/styles/zIndex";
import { height } from "@mui/system";
import Footer from "./Footer";
import { Player } from 'video-react';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCircle, faCity, faCoffee, faUtensils } from '@fortawesome/free-solid-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faBriefcase, faCity, faCoffee, faUtensils } from '@fortawesome/free-solid-svg-icons'

// library.add(fab, faBriefcase, faCity, faCoffee, faUtensils)
Geocode.setApiKey("AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM")



class Map extends React.Component{


        state = {


          videos:[],
          // selectedVideo: null,
          foodvideos:[],
          // foodselectedVideo: null,
          workvideos:[],
          // workselectedVideo: null,

          dhksc: "",
         
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


      // componentDidMount(){
      //   this.handleSubmit("stockholm")
      //   this.WorkhandleSubmit("stockholm")
      //   this.FoodhandleSubmit("stockholm")
      // }
      

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
          // selectedVideo:response.data.items[0] 
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
        // foodselectedVideo:response.data.items[0] 
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
      // workselectedVideo:response.data.items[0] 
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
      
       
    //    handleVideoSelect = (video) => {
    //     this.setState({
    //         selectedVideo: video
    //     })
    // }

    
  
   
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



                  {/* <Search> */}


                  {/* </Search> */}
                </GoogleMap>
              ));


        return(
         <div>
        
          <MapWrapper>
            <MapWrapper1>
              <PlayerWrapper>
                <ReactPlayer 
                url="https://assets.mixkit.co/videos/preview/mixkit-venice-central-canal-at-night-4646-large.mp4"
                playing="true"
                loop="true"
                width='100%'
                height='100%'
                />
              </PlayerWrapper> 
              <MapInner>
                  <SearchText>
                    <p>You can start your journey with three category of city you want to go.</p>
                  </SearchText>
                  <AutoComplete
                        types={['(country)']}
                        onPlaceSelected= {this.onPlaceSelected}
                        style={{
                          width: '100%',
                          height: '40px',
                          paddingLeft: '16px',
                          marginTop: '2px',
                          marginBottom: '2rem',
                        }}
                  /> 
              </MapInner>
            </MapWrapper1>



            <MapWrapper2>
              <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGX39_vj1YuXzup9jOmR29Iw_u_5Y4JQM&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `60vh` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                />
            </MapWrapper2>
          </MapWrapper>

          <Margin></Margin>



       {/* <Nav> */}
        <NavBorder>
          <Navigator>
            <Navigator1>
              <City>
                <span>
                {/* style="position: absolute; top: 50%; left: 50%;" */}
                   <FontAwesomeIcon icon={faCity} size="lg" mask={ faCircle } size="2x" transform="shrink-6"/>
                  
                </span>
                <NavText>City</NavText>
              </City>
              <Work>
                <span>
                 
                   <FontAwesomeIcon icon={faBriefcase}  size="lg"  mask={ faCircle } size="2x" transform="shrink-6"/>
                  
                </span>
                <NavText>Work</NavText>
              </Work>
              <Food>
                <span>     
                            
                   <FontAwesomeIcon icon={faUtensils}  size="lg"  mask={ faCircle } size="2x" transform="shrink-6"/>  
                               
                </span>
                <NavText>Food</NavText>
              </Food>
            </Navigator1>
          </Navigator>
        </NavBorder>
       {/* </Nav> */}

       

    
         <TopCitywrapper1>
         　<DivTopCitywrapper>
            <Div2TopCitywrapper>             
              <h1>City</h1>          
            </Div2TopCitywrapper> 
           </DivTopCitywrapper> 
         </TopCitywrapper1>


         <TopCitywrapper>
         　<DivSecondCitywrapper>
            <Div2SecondCitywrapper>
              <p>The cityscape remains in your heart forever.  </p>
              <Border></Border>
            </Div2SecondCitywrapper> 
           </DivSecondCitywrapper> 
         </TopCitywrapper>



         
         <VideoWrapper>

          <VideoImage>
            <VideoImage1>
             <h3>City</h3>
             <VideoImage2>
              <img src="https://images.unsplash.com/photo-1523304867125-2293c498e08a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGxvbmRvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" height="440vh" width="330vw" />
             </VideoImage2>
            </VideoImage1>
          </VideoImage> 

          <VideoItems>
           <VideoItem>
            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos} />
           </VideoItem>
          </VideoItems>

         </VideoWrapper>


         <TopCitywrapper>
         　<DivTopCitywrapper>
            <Div2TopCitywrapper>             
              <h1>Work</h1>          
            </Div2TopCitywrapper> 
           </DivTopCitywrapper> 
         </TopCitywrapper>


         <TopCitywrapper>
         　<DivSecondCitywrapper1>
            <Div2SecondCitywrapper>
            <p>Working make someones's life more exiting. </p>
              <Border></Border>
            </Div2SecondCitywrapper> 
           </DivSecondCitywrapper1> 
         </TopCitywrapper>
　　　　　　

         <VideoWrapper>
          <VideoItems>
            <VideoItem>
             <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.workvideos} />
            </VideoItem>
          </VideoItems>
          <VideoImage>
            <VideoImage1>
            <h3>Work</h3>
            <VideoImage2>
              <img src="https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjIyfHx3b3JraW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" height="440vh" width="330vw" />
            </VideoImage2>
            </VideoImage1>
          </VideoImage>
　　　　　　</VideoWrapper>
         


          <TopCitywrapper>
         　<DivTopCitywrapper>
            <Div2TopCitywrapper>             
              <h1>Food</h1>          
            </Div2TopCitywrapper> 
           </DivTopCitywrapper> 
          </TopCitywrapper>


          <TopCitywrapper>
          　<DivSecondCitywrapper>
              <Div2SecondCitywrapper>
                <p>To eat is to color your life.</p>
                <Border></Border>
              </Div2SecondCitywrapper> 
            </DivSecondCitywrapper> 
          </TopCitywrapper>



          <VideoWrapper>

            <VideoImage>
              <VideoImage1>
                <h3>Food</h3>
              <VideoImage2>
                <img src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxmb29kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" height="440vh" width="330vw" />
              </VideoImage2>
                <p>Cityscape is one of the important elements for living there.
                  You can feel the city you find here. </p>
              </VideoImage1>
            </VideoImage>

            <VideoItems>
              <VideoItem>
               <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.foodvideos} />
              </VideoItem>
            </VideoItems>
  　　　　　　</VideoWrapper>


            <FooterCaption>
              <FooterCaption1>
              <p>you can find some Instagram  post of #city name you research</p>
              </FooterCaption1>
            </FooterCaption>

            
             <Footer/>
            

            
         </div>
          
        );
    }
}

export default Map;

const MapWrapper = styled.div`
margin-bottom:10vh;
position: relative;
height: 100vh;
display: flex;
-webkit-flex-direction: column;
flex-direction: column;


`


const MapWrapper1 = styled.div`
position: relative;
padding-top: 56.212%;
width: 100%;
`

const MapInner = styled.div`

text-align:center;
position: absolute;
top: 40%;
left: 50%;
transform: translate(-50%, -50%);
-webkit-transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
p{
  color: white;
}
`

const SearchText = styled.div`
margin-top: 10vh;
margin-bottom: 5vh;
text-align: center;
`

const PlayerWrapper = styled.div`
position: absolute;
top: 0;
left: 0;
bottom: 0;
right: 0;
overflow: hidden;
width: 100%;
height: 100%;
object-position: center;
z-index: -1;
object-fit: cover;
`

const MapWrapper2 = styled.div`
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


const NavBorder = styled.div`


width: 100%;
display: block;
border-top: 1px solid rgba(0,0,0,.15);
position: -webkit-sticky;
position: sticky;
top: 10vh;
`

const Navigator= styled.div`

margin-left: 5vw;
// position: -webkit-sticky;
// position: sticky;
// top: 0;
span{
  
}
`

const Navigator1= styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
sapn{
  margin-right: 0.5vw;
}
`

const City= styled.div`
color: rgba(0,0,0,.45);
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

const Work= styled(City)`

`

const Food= styled(City)`

`


const NavText= styled.div`
margin-left: 1vw;
margin-right: 3vw;

`


const Insta= styled.div`
height: 10vh;
position: relative;

`

const TopCitywrapper= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;

`


const TopCitywrapper1= styled.div`

position: relative;
margin-left: 32px;
margin-right: 32px;
margin-top: 10vh;
git`



const DivTopCitywrapper = styled.div`

margin-left: 30%;
margin-right: 30%;
position: relative;
padding: 0 12px;


`

const Div2TopCitywrapper = styled.div`
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


const DivSecondCitywrapper = styled.div`

font-size: 24px;
margin-right: 60%;
position: relative;
padding: 0 48px;


`

const DivSecondCitywrapper1 = styled.div`

font-size: 24px;
margin-left: 60%;
position: relative;
padding: 0 48px;


`

const Div2SecondCitywrapper = styled.div`


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

const VideoWrapper = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20vh;
// margin-top: 20vh;
`


const VideoImage = styled.div`
width: 50vw;
background-color: #F8F8F8;


p{
  margin-top: 10vh;
  width: 80%;
}
`

const VideoImage1 = styled.div`
padding: 10% 5% 10% 10%;
display: flex;
text-align: center;
align-items: center;
flex-direction: column;
`

const VideoImage2 = styled.div`

height: 100%;
object-fit: contain;
// background: url("https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
`

const VideoItems = styled.div`
width: 50vw;
background-color: white;

`

const VideoItem = styled.div`
margin-right: 32px;
margin-left: 32px;
width: 100%;

`

const FooterCaption = styled.div`
border-top: 1px solid black;

`


const FooterCaption1 = styled.div`

padding: 5% 10%;

p{
  text-align: center;
}

`







// const Search= styled.div`
// height: 5vh;
// position: absolute;
// top: -10vh;
// width: 30%;
// margin: auto;


// `