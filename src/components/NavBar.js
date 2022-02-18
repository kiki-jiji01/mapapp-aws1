import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCircle, faCity, faUtensils} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";



function NavBar (){

        return(
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
        );
    }


export default NavBar;

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
