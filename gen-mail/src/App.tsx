import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Home from "./pages/Home";
import EmailPage from "./pages/EmailPage";
import SnsPage from "./pages/SnsPage";
import ChatPage from "./pages/ChatPage";
import { useTranslation } from "react-i18next";
import "./App.css";

const LOCAL_STORAGE_KEY = "USER_LANGUAGE"

function App() {
  const [language, setLanguage] = useState("");
  const { t, i18n } = useTranslation();

  // useEffect(() => {
  //   const userLang = window.localStorage.getItem('USER_LANGUAGE');
  //   if (userLang) setLanguage(JSON.parse(userLang));
  //   console.log("language is", language)
  // }, [])

  useEffect(() => {
    i18n.changeLanguage(language);
    // window.localStorage.setItem('USER_LANGUAGE', JSON.stringify(language));
  }, [language]);

  return (
    <BrowserRouter>
      <Sidebar setUserLanguage={setLanguage}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/email" element={<EmailPage />} />
          <Route path="/sns" element={<SnsPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
