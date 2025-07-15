import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../src/components/Login";
import Signup from "../src/components/Signup";
import Home from "../src/components/Home";
import Contact from "../src/components/Contact";
import Friend from "../src/components/Friend";
import Posts from "../src/components/Posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/friends' element={<Friend />} />
        <Route path='/create' element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;