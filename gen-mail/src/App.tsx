import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/SideBar';
import Home from './pages/Home';
import EmailPage from './pages/EmailPage';
import SnsPage from './pages/SnsPage';
import ChatPage from './pages/ChatPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/email' element={<EmailPage />} />
        <Route path='/sns' element={<SnsPage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
