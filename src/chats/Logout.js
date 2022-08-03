import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";

export default function Logout({setCurrentChat}) {
  const navi = useNavigate();

    const logoutUser = () => {
        // localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
        // navi("/");
        setCurrentChat(undefined)
    }


    
    
  
  return (
    <Button onClick={logoutUser}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
