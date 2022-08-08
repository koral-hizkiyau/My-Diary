import React, { useCallback, useEffect, useState } from 'react'
import DiaryAdd from '../diary/DiaryAdd';
import Nav from "../Nav";
import { Button } from '@mui/material';
import "../css/diary.css";
import DiaryPages from '../diary/DiaryPages';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { apiUrl, doApiGet } from '../services/apiService';
import { addNewDiaryUser } from '../js/data';

export default function Diary() {
  const navi = useNavigate();
  const [flagAdd , SetFlagAdd] = useState(false);
  const [diarypagesArr , SetDiarypagesArr] = useState([]);
  let userToken = jwt_decode(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  const [allData, setAllData] = React.useState([]);

  useEffect( () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navi("/");
    } else {
      console.log("new");
      let userToken = jwt_decode(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      let diarypages = apiUrl + "diary";
      doApiGet(diarypages)
      .then(data => {
        let arr = data.filter(item => item.user_id === userToken._id);
        setAllData(arr);
        if(arr.length > 0){
          if(arr[0].user_pages.length > 0){
          SetDiarypagesArr(arr[0].user_pages);
          }
        }
        else{
          newUser(userToken);
        }
     })   
    
  
    }
  }, []);


  const newUser = ((userToken)=> {
    let newUserA = {user_id: userToken._id,
    "user_pages": []}
    SetDiarypagesArr(newUserA.user_pages);
    addNewDiaryUser(newUserA);


  })

  const OnClickChangeFlagAdd = () => {
    SetFlagAdd(!flagAdd);
  }
  return (
    <>
        <Nav/>
        
        <Button variant="contained" className='addButton2' onClick={OnClickChangeFlagAdd} style={{display:"flex", justifyContent:"center", margin:"auto"}}>Add New Page</Button>
      {flagAdd ? 
        <DiaryAdd userToken={userToken} SetFlagAdd={SetFlagAdd} flagAdd={flagAdd} diarypagesArr={diarypagesArr} SetDiarypagesArr={SetDiarypagesArr} />
: ""}
        <DiaryPages diarypagesArr={diarypagesArr} userToken={userToken} SetDiarypagesArr={SetDiarypagesArr} allData={allData}/>
    </>
  )
}
