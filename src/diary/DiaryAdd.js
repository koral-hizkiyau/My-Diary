import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import "../css/diary.css";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { addDiary } from '../js/data';
import { convertDate } from '../js/data';

export default function DiaryAdd(props) {
    const [value, setValue] = useState(new Date());

    const titleAdd = useRef();
    const dateAdd = useRef();
    const textAdd = useRef();
    


    const sendToDiary = (event) => {
        event.preventDefault();

        let data={
            title: titleAdd.current.value,
            text: textAdd.current.value,
            date: dateAdd.current.value,
            rotate: false,
            isOpen: false
        }
        addDiary(data, props.userToken);
        props.diarypagesArr.push(data);
        props.SetFlagAdd(!props.flagAdd);
    }

  


  return (
    <div className='diary-app'>
        <form action="" onSubmit={(event) => sendToDiary(event)}>

<div className='row' style={{margin: "2%", justifyContent: "center" , display: "flex"}}>
    <div className='col-lg-6' id='titleAdd'>
        <TextField
          inputRef={titleAdd}
          id="outlined-required"
          label="Title"
          placeholder='Title'
          sx={{ m:1, width: '27ch',
            input: { color: "white"}
                   }}
         inputProps={{ maxLength: 14 }}

          required
          focused/></div>
          <div className='col-lg-6' id='dateAdd'>
            <LocalizationProvider dateAdapter={AdapterDateFns}> 
            <DatePicker
          disableFuture
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} required inputRef={dateAdd}
          sx={{
            svg: { color: "white" }, input: { color: "white"}, m:1, width: '17ch',
                    }} focused/>}
        />
 </LocalizationProvider> </div>
        </div>
        
        <div className='col-lg-12' id='textMulti'>
        <TextField
        required
        inputRef={textAdd}
          id="outlined-multiline-static"
          label="Enter your text here..."
          multiline
          rows={12}
          sx={{
             input: { color: "white"}
                    }}
          focused
        />
<Button type="submit" variant="contained" className='addButton'>Add to Diary</Button>

</div>
</form>

    </div>
  )
}
