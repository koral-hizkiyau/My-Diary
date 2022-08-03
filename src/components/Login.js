/* eslint-disable array-callback-return */
import React, { useRef, useState, useEffect } from 'react';
import { apiUrl, doApiGet} from '../services/apiService';
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { doApiGetToken } from '../services/apiService';
import { useNavigate, Link } from "react-router-dom";
import { parseJwt } from "../js/data";
import "react-toastify/dist/ReactToastify.css";
import { doApiPostToken } from '../services/apiService';

function Login(){
  const navi= useNavigate();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    let [users, setUsers] = useState([]);

    let emailRef = useRef();
    let passwordRef = useRef();

    useEffect(() => {
      let urlToken = apiUrl + 'users/checkToken';
      let urlUsers = apiUrl + "users";

      if (localStorage[process.env.REACT_APP_LOCALHOST_KEY]) {

       
        let token = parseJwt(localStorage[process.env.REACT_APP_LOCALHOST_KEY]) 
        //בודק אם האימייל הוא מנהל או משתמש רגיל
        doApiGetToken(urlUsers)
          .then(data => {
            data.map(item => {
              if (item.email === token.email) {
              }
            })

          })
        fetch(urlToken, {
          headers: { 'x-auth-token': localStorage[process.env.REACT_APP_LOCALHOST_KEY] }
        })
          .then(resp => resp.json())
          .then(data => {
            if (data.message !== "ok") {
        

            }
          })
      }
      else {
        let urlUsers = apiUrl + "users";
                    doApiGet(urlUsers)
                        .then(data => {
                            setUsers(data)
                        })
    
          
                    
      }
      //אם יש עדכון בלוקאל סטורג
    }, [localStorage[process.env.REACT_APP_LOCALHOST_KEY]])

   


    const validateForm = (event) => {
      const  email = event.target.id_email.value;
      const password = event.target.id_password.value;
      if (email === "") {
        toast.error("Email and Password is required.", toastOptions);
        return false;
      } else if (password === "") {
        toast.error("Email and Password is required.", toastOptions);
        return false;
      }
      return true;
    };


        const sendLoginForm = (event) => {
          event.preventDefault();
          if(validateForm(event)){
          let bodyData = {
              email: event.target.id_email.value,
              password: event.target.id_password.value
          }

          let url = apiUrl+'users/login';
          doApiPostToken(url, bodyData)
              .then(data => {
                  //אומר שהצלחנו לקבל טוקן
                  if (data.token) {
                      localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, data.token);
                      console.log("connect");
                      navi("/homepage");
                  }
                  if (data.message === false) {

                    toast.error("email or password is incorrect!", toastOptions);
                  }
                 
                }
                
                
                 )
          }
     
      }
  



    // }
    
    return(
        <>
<FormContainer>

<form action="" onSubmit={(event) => sendLoginForm(event)}>
          <div className="brand">
            <h1>Login</h1>
          </div>
          <input
            type="text" ref={emailRef} id="id_email"
            placeholder="Email"
            name="email"
            min="10"
          />
          <input
            type="password" ref={passwordRef} id="id_password"
            placeholder="Password"
            name="password"
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
        </FormContainer>
        <ToastContainer />
        </>
    );
    
}

export default Login;


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
    padding: 5rem;
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