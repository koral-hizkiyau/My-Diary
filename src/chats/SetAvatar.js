import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Buffer } from "buffer";
import loader from "../images/loader2.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { apiUrl, doApiGet, doApiPostToken } from "../services/apiService";
import jwt_decode from "jwt-decode";
import multiavatar from "@multiavatar/multiavatar/esm";

export default function SetAvatar() {
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


useEffect(() => {
  let timer;
  const seeds = Array.from({ length: 4 }, () =>
    String(Math.floor(Math.random() * 1e12))
  );

  const items = seeds.map((seed) => {
    const svg = multiavatar(seed); // SVG string
    const b64 = window.btoa(unescape(encodeURIComponent(svg))); // for server
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const preview = URL.createObjectURL(blob); // for <img>
    return { b64, preview };
  });

  timer = setTimeout(() => {
    setAvatars(items);
    setIsLoading(false);
  }, 600);

  return () => {
    clearTimeout(timer);
    items.forEach((it) => URL.revokeObjectURL(it.preview));
  };
}, []);
const setProfilePicture = async () => {
  if (selectedAvatar === undefined) {
    toast.error("Please select an avatar", toastOptions);
    return;
  }

  let user = { ...myUser[0] };
  user.isAvatarImageSet = true;
user.avatarImage = avatars[selectedAvatar].b64; // base64 only, no data: prefix
  user._id = myUser[0]._id;

  const updateUrl = apiUrl + "users/updateavatar";
  try {
    const resp = await doApiPostToken(updateUrl, user);
    if (resp && resp.isSet) {
      setMyUser([{ ...user }]);
      navi("/homepage");
    } else {
      toast.error("Failed to save avatar", toastOptions);
    }
  } catch (err) {
    console.error(err);
    toast.error("Error saving avatar", toastOptions);
  }
};



  

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
  {avatars.map((a, index) => (
    <div
      key={index}
      className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
      onClick={() => setSelectedAvatar(index)}
    >
      <img src={a.preview} alt="avatar" />
    </div>
  ))}
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
