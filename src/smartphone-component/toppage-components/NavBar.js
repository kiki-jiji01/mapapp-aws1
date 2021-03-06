import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCircle, faCity, faUtensils} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";



function NavBar (){

        return(
        <NavWrapper>
          <NavWrapper1>
            <NavWrapper2>
              <NavCityWrapper >
                <a href='#city'>
                 <FontAwesomeIcon icon={faCity} size="lg" size="2x" transform="shrink-6" color='#0a0908'/>
                </a>
                <NavTextWrapper >City</NavTextWrapper>
              </NavCityWrapper>
              <NavWorkWrapper>
                <a href='#work'>
                 <FontAwesomeIcon icon={faBriefcase}  size="lg" size="2x" transform="shrink-6" color='#0a0908'/> 
                </a>
                <NavTextWrapper >Work</NavTextWrapper>
              </NavWorkWrapper>
              <NavFoodWrapper>
                <a href='#food'>                     
                 <FontAwesomeIcon icon={faUtensils}  size="lg"  size="2x" transform="shrink-6" color='#0a0908'/>               
                </a>
                <NavTextWrapper>Food</NavTextWrapper>
              </NavFoodWrapper>
            </NavWrapper2>
          </NavWrapper1>
        </NavWrapper>
        );
    }


export default NavBar;



const NavWrapper = styled.div`
width: 100%;
display: block;
border-top: 1px solid rgba(0,0,0,.15);
position: -webkit-sticky;
position: sticky;
top: 6.5vh;
z-index: 10;
`


const NavWrapper1= styled.div`
margin-left: 5vw;
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
color: rgba(0, 0, 0, 0.9);
font-family: 'DDINExpRegular',"Helvetica Neue",Helvetica,Arial,sans-serif;
display: flex;
align-items: center;
text-transform: none;
font-size: 14px;
font-weight: 600;
line-height: 24px;
letter-spacing: 0;
`


const NavWorkWrapper= styled(NavCityWrapper)`
`


const NavFoodWrapper= styled(NavCityWrapper)`
`


const NavTextWrapper= styled.div`
margin-left: 0vw;
margin-right: 1.5vw;
`
