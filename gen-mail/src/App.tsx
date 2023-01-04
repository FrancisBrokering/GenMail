import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/SideBar';
import Home from './pages/Home';
import EmailPage from './pages/EmailPage';

function App() {

  return (
    <BrowserRouter>
      <Sidebar >
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/email' element={<EmailPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
