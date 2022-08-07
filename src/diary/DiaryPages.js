import { Box, Button, Paper, Typography } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import "../css/diary.css";
import { editRotateDiary } from '../js/data';

export default function DiaryPages(props) {
    const [isRotated, setIsRotated] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [currentArr, setCurrentArr] = useState([]);


    useEffect(()=> {

        let arr = props.diarypagesArr.filter(item=>item.isOpen);
        if(arr.length > 0){
            setFlag2(true)
    }
    },[props.counter])

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

 function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
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
    let currentDate = convertDate(paper.date);
return (
    <>
    {paper.isOpen ?

        <div className='page-popup' style={{color: "white"}}>
       <Button variant="contained" className='btnOpen' style={{display: "block" }} onClick={()=>OnOpen(paper)}>Zoom Out</Button>{paper.text}
        </div>
        : ""}
    <Paper key={paper._id} elevation={i} className={`card ${paper.rotate ? 'rotated': '' }`} onClick={()=>onRotate1(paper)}>

    <div className="front"> 
    <Typography variant="h5" style={{margin: "2%"}}>{currentDate}</Typography>
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
