import { Box, Button, Paper, Typography } from '@mui/material'
import React, {  useEffect, useRef, useState } from 'react'
import "../css/diary.css";
import { editRotateDiary ,convertDate, delDiaryPage } from '../js/data';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import TextField from '@mui/material/TextField';

export default function DiaryPages(props) {
    const navi = useNavigate();
    const [isRotated, setIsRotated] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [currentArr, setCurrentArr] = useState([]);
    const [flagEdit, setFlagEdit] = useState(false);
    const [value, setValue] = useState();
    useEffect(()=> {

        let arr = props.diarypagesArr.filter(item=>item.isOpen);
        if(arr.length > 0){
            setFlag2(true);

    }
    },[])

    const onRotate1 = (rotate) =>{
        if(rotate.isOpen === false){
        let data = rotate;
        data.rotate = !data.rotate;
        let change = data.rotate;
        let newRotate = props.diarypagesArr.map(paper => {
            if(paper._id === rotate._id){
              return { ...paper, change }
            }
            else{
              return paper
            }
            })
        editRotateDiary(newRotate, props.userToken);
        setIsRotated((rotated) => !rotated);  
        setCurrentArr(newRotate);
        }        
    } 

 const OnOpen=(arr)=>{
  if(flagEdit)setFlagEdit(!flagEdit);
    setFlag2(!flag2);
            let data = arr;
        data.isOpen = !data.isOpen;
        let change = data.isOpen;
        let newRotate = props.diarypagesArr.map(paper => {
            if(paper._id === arr._id){
              return { ...paper, change }
            }
            else{
              return paper
            }
            })
        editRotateDiary(newRotate, props.userToken);               
 }

const delPage=(page_id)=> {
    let arr = props.diarypagesArr.filter(page => page._id !== page_id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this journal page!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your journal page has been deleted!", {
          icon: "success",
        }).then(()=>{
            delDiaryPage(arr, props.allData);
           props.SetDiarypagesArr(props.diarypagesArr.filter(page => page._id !== page_id));

        })
      }else{
        swal("Your appointment not deleted!");
      }
    });
}

const editPage=(paper)=>{
if(paper.isOpen)setFlagEdit(!flagEdit);
setValue("");
}

const sentEditPage=(event,arr)=>{
  event.preventDefault();
  let data = arr;
  data.text = value;
  let change = data.text;
  let newRotate = props.diarypagesArr.map(paper => {
  if(paper._id === arr._id){
    return { ...paper, change }
  }
  else{
    return paper
  }
  })
editRotateDiary(newRotate, props.userToken);  
setFlagEdit(!flagEdit);             


}


  return (
    <div>
        {flag2 ? <div className='back-popup'></div> : "" }

   <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '20px',
        '& > :not(style)': {
          m: 1,
          width: 287,
          height: 287,
          background: '#161a2b',

        },
      }}
    >
{props.diarypagesArr.map((paper,i) => {
return (
    <>
    {paper.isOpen ?

        <div className='page-popup' style={{color: "white"}}>
<div style={{display: "block" }}><IconButton aria-label="delete" size="large" onClick={()=>delPage(paper._id)}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="edit" size="large" onClick={()=>editPage(paper)}>
        <EditRoundedIcon fontSize="inherit" />
      </IconButton>
       <Button variant="contained" className='btnOpen' onClick={()=>OnOpen(paper)}>Zoom Out</Button></div>{paper.text}
        {flagEdit ? <form action="" onSubmit={(event) => sentEditPage(event,paper)}>
<TextField
        required
        value={value}
        onChange={(e)=>setValue(e.target.value)}
          id="outlined-multiline-static"
          label="Enter your text here..."
          multiline
          rows={18}
          sx={{
             input: { color: "blue"}, position:"relative",backgroundColor:"lightgray",width:"100%"
                    }}
          focused
        /> 
        <Button type="submit" variant="contained" className='addButton' style={{display:"flex",justifyContent:"center",margin:"auto"}}>Edit</Button></form>
         : ""}
        </div>
        : ""}
    <Paper key={paper._id} elevation={i} className={`card ${paper.rotate ? 'rotated': '' }`} onClick={()=>onRotate1(paper)}>

    <div className="front"> 
    <Typography variant="h5" style={{margin: "2%"}}>{convertDate(paper.date)}</Typography>
    <Typography variant="h4" style={{display: "flex",justifyContent:'center',marginTop:"29%"}}>{paper.title}</Typography>
</div>

<div className="back" >
<Button variant="contained" className='btnOpen' onClick={()=>OnOpen(paper)}>Zoom In</Button>

<Typography id="tybacktext" variant="h5"  style={{ color:"white",  wordWrap: "break-word", margin: "1%"
}}>{paper.text}</Typography>

</div>

    </Paper>
    </>
)
})}

    </Box>

    </div>
  )
}
