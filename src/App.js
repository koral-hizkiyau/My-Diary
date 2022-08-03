import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Navigate,Route, Routes } from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import SetAvatar from './chats/SetAvatar';
import Chat from './components/chat';
import Homepage from './components/Homepage';
import Todolists from './components/Todolists';
import { useNavigate } from "react-router-dom";
import MyProfile from './profile/MyProfile';


function App() {


  return (
  <div className='App'>
    <Router> 
       {/* <Routes>
      <Route exact path={["/"]} render={() => {
          return (
            <React.Fragment>
            </React.Fragment>
          )
        }
        } />
      </Routes>  */}
<Routes>
<Route exact path="/" element={<Login />} />
<Route  path="/register" element={<Register />} />
<Route  path="/setAvatar" element={<SetAvatar />} />
<Route  path="/chat" element={<Chat />} />
<Route path="/homepage" element={<Homepage/>}/>
<Route path="/todolist" element={<Todolists/>}/>
<Route exact path="/myprofile" element={<MyProfile/>}/>
<Route path="*" element={<Navigate to='/' replace />} />

</Routes>

    </Router>



  </div>
  );
}


export default App;
