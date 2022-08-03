import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Welcome from "../chats/Welcome";
import {apiUrl, doApiGet, host} from "../services/apiService";
import jwt_decode from "jwt-decode";
import Contacts from "../chats/Contacts";
import ChatContainer from "../chats/ChatContainer";
import Nav from "../Nav";

export default function Chat() {
  const navi = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState([]);
  const [allCurrentUsers, setAllCurrentUsers] = useState([]);

  useEffect( () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navi("/");
    } else {
      let userToken = jwt_decode(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      let allUsers = apiUrl + "users";
      doApiGet(allUsers)
      .then(data => {
        setAllCurrentUsers(data.filter(item => item._id !== userToken._id));
          setCurrentUser(data.filter(item => item._id === userToken._id));
     })    
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function setUser(){

    if (currentUser) {
      if (currentUser[0].isAvatarImageSet) {
        setContacts(allCurrentUsers); 
      } else {
        navi("/setAvatar");
      }
    }
  }
  if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    navi("/");
  }
  else{
  setUser();
  }
  }, [currentUser]);




  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };  


  return (
    <>
    <Nav/>
      <Container>
        <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
           <Welcome/>
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} setCurrentChat={setCurrentChat} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
