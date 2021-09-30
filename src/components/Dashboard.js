import React from "react";
import styled from "styled-components"



class Dashboard extends React.Component{
    render(){
        return(
           <DashboardWrapper>
               <h>{this.props.address}</h>
              
           </DashboardWrapper>
        );
    }
}

export default Dashboard;


const DashboardWrapper = styled.div`

position: relative;

`
