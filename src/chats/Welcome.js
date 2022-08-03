import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../images/robot.gif";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const [userName, setUserName] = useState("");
    const navi = useNavigate();

    useEffect(() => {
        async function findUser(){
          let userToken = jwt_decode(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        setUserName(
          userToken.username
        );
           }
           if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navi("/");
           }
           else{
           findUser();
           }
      }, []);

    return (
        <Container>
          <img src={Robot} alt="" />
          <h1>
            Welcome, <span>{userName}!</span>
          </h1>
          <h3>Please select a chat to Start messaging.</h3>
        </Container>
      );
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
