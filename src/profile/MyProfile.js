import React, { useEffect, useState } from 'react'
import Nav from '../Nav'
import jwt_decode from "jwt-decode";
import { apiUrl, doApiGet } from '../services/apiService';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function MyProfile() {
    const [myprofile, setMyProfile] = useState([{"_id": "","username": "","email": "","avatarImage": ""}]);
    const navi = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navi("/");
          } else {
            let userToken = jwt_decode(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
            let allUsers = apiUrl + "users";

            doApiGet(allUsers)
            .then(data => {
                setMyProfile(data.filter(item => item._id === userToken._id));
           })    
          }
        },[])

  return (

    <Container>
        <Nav/>

        <div className="clearfix">
        <div className="row">
            <div className="col-md-4 animated fadeIn d-flex justify-content-center" style={{margin: "auto"}} key={myprofile[0]._id}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img
src={`data:image/svg+xml;base64,${myprofile[0].avatarImage}`} className="card-img-top"
                      alt="img" width={"150px"}
                    />
                  </div>
                  <h5 className="card-title">
                    {myprofile[0].username}
                  </h5>
                  <p className='email-profile'>{myprofile[0].email}</p>
                  <p></p>
                  
                </div>
              </div>
            </div>
          
        </div>
       
      </div> 
    </Container>
  )
}
export default MyProfile;

const Container = styled.div`
.email-profile{
    color:white;
}

.card-title{
    color:white;
    font-size:16px;
    margin-top:5%;
}
.clearfix{
    display:flex;
    justify-content: center;
    margin-top:10%;
    text-align: center; 
}


`