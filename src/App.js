import React from 'react';
import About from './Components/About';
import AddNote from './Components/AddNote';
import Navbar from './Components/Navbar';
import Notestate from './context/Notes/Notestate';
import NoteItems from './Components/NoteItems';
import Login from './Components/Login';
import Signup from './Components/Signup';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  
  return (
    <div className='overflow-hidden'>
    <Notestate>  
    <Navbar></Navbar>
    <Routes>
        <Route path="/" exact element={<AddNote></AddNote>}/>
        <Route path="/About" exact  element={<About></About>} />
        <Route path="/Notes" exact  element={<NoteItems></NoteItems>} />
        <Route path="/Login" exact  element={<Login></Login>} />
        <Route path="/Signup" exact  element={<Signup></Signup>} />
      </Routes>
    </Notestate>
   </div> 
)}

export default App;
