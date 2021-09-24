import React,{useState,useEffect} from 'react';
import axios from "axios";
import styled from "styled-components"

function Sns() {
    
        useEffect(() => {
            fetch("https://graph.facebook.com/17841564013123618/top_media?user_id=17841411766795081&fields=id,permalink,media_type,comments_count,like_count&access_token=EAA9mxzmBApoBAGrdMdpLi3D7GCxZCa590QkvwiRwluHlmkamsYqO4HyiPjUCTpnQ78pC3HVmRZC8uFvL5G1PExQoF3ftduM3cxF0ILx5ZCvywoCW9w6ZBp5Bux7nFfIGpvNBzRAtVpr5iZCtP4Y3rDQnDPd4oU88bBbUmF4bJbWdgvy76fvYp")
              .then((response) => response.json())
              
              .then((data) => {
                console.log(data);
              
              });
          }, []);
    return(
        <SnsWrapper>
            <div>
                <h>aho</h>
            </div>
        </SnsWrapper>
    );
}

export default Sns;


const SnsWrapper = styled.div`
height: 20vh;
position: relative;
top:50vh;
`