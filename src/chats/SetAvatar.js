import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../images/loader2.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { apiUrl, doApiGet, doApiPostToken } from "../services/apiService";
import jwt_decode from "jwt-decode";

export default function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navi = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allusers, setAllUsers] = useState([]);
    const [myUser, setMyUser] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    useEffect( () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
          navi("/");
        else{
          let userToken = jwt_decode(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
          let allUsers = apiUrl + "users";
          doApiGet(allUsers)
          .then(data => {
              setAllUsers(data.filter(item => item._id !== userToken._id))
              setMyUser(data.filter(item => item._id === userToken._id))

         })
        }

 
      }, []);



  const setProfilePicture = async () => {

    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      let user = myUser[0];
      user.isAvatarImageSet = true;
      user.avatarImage = avatars[selectedAvatar];
  let updateUrl = apiUrl + 'users/updateavatar';

  doApiPostToken(updateUrl, user)
      .then(data => {
          setMyUser(data)

          navi("/homepage");

          })
        
        }
    
  };


  

      // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => {
    async function avatarSets() {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
}
avatarSets();
  }, []);
  
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div key={avatar}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: green;
    }
  }
`;
