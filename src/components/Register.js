/* eslint-disable array-callback-return */
import React, { useRef } from 'react';
import { apiUrl, doApi, doApiGetToken} from '../services/apiService';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { doApiPostToken } from '../services/apiService';
function Register(){
  const navi= useNavigate();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
        
    let emailRef = useRef();
    let passwordRef = useRef();
    let usernameRef = useRef();
    let conpasswordRef = useRef();


  
      //אם יש עדכון בלוקאל סטורג

   

    const handleValidation = (event) => {
        const email = event.target.id_email.value;
        const password = event.target.id_password.value;
        const confirmPassword = event.target.id_conPassword.value;
        const username = event.target.id_username.value;
        if (password !== confirmPassword) {
          toast.error(
            "Password and confirm password should be same.",
            toastOptions
          );
          return false;
        } else if (username.length < 3) {
          toast.error(
            "Username should be greater than 3 characters.",
            toastOptions
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOptions
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", toastOptions);
          return false;
        }
    
        return true;
      };


        const sendRegisterForm = (event) => {
          event.preventDefault();
          if(handleValidation(event)){
          let bodyData = {
              email: event.target.id_email.value,
              password: event.target.id_password.value,
              username: event.target.id_username.value   
                   }
          let url = apiUrl+'users/reg';
          doApiPostToken(url, bodyData)
              .then(data => {
                  if (data.token) {
                      localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, data.token);
                      navi("/setAvatar");
                  }
                  if (data.status === false) {

                    toast.error(data.msg, toastOptions);
                  }
                 
                }
                
                
                 )
          }
     
      }
  



    
   
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => sendRegisterForm(event)}>
          <div className="brand">
            <h1>Registration</h1>
          </div>
          <input
            type="text" id="id_username" ref={usernameRef}
            placeholder="Username"
            name="username"
          />
          <input
            type="email" id="id_email" ref={emailRef}
            placeholder="Email"
            name="email"
          />
          <input
            type="password" id="id_password" ref={passwordRef}
            placeholder="Password"
            name="password"
          />
          <input
            type="password" id="id_conPassword" ref={conpasswordRef}
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;


