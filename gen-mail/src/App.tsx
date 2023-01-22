import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import EmailPage from "./pages/EmailPage";
import SnsPage from "./pages/SnsPage";
import { useTranslation } from "react-i18next";
import "./App.css";

import { TourProvider } from "@reactour/tour";
import { steps } from "./tour/steps";

const LOCAL_STORAGE_KEY = "USER_LANGUAGE";

function App() {
  const [language, setLanguage] = useState("ja");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedUserLang = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUserLang) {
      setLanguage(storedUserLang);
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(language));
  }, [language]);

  const radius = 10;

  return (
    <BrowserRouter>
      <TourProvider
        steps={steps}
        badgeContent={({ totalSteps, currentStep }) =>
          currentStep + 1 + "/" + totalSteps
        }
        styles={{
          popover: (base) => ({
            ...base,
            "--reactour-accent": "#ef5a3d",
            borderRadius: radius,
          }),
          maskArea: (base) => ({ ...base, rx: radius }),
          // maskWrapper: (base) => ({ ...base, color: '#ef5a3d' }),
          badge: (base) => ({ ...base, left: "auto", right: "-0.8125em" }),
          controls: (base) => ({ ...base, marginTop: 100 }),
          close: (base) => ({ ...base, right: "auto", left: 8, top: 8 }),
        }}
      >
        <Sidebar userLanguage={language} setUserLanguage={setLanguage}>
          <Routes>
            <Route path="/" element={<EmailPage />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/email" element={<EmailPage />} />
            <Route path="/sns" element={<SnsPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </Sidebar>
      </TourProvider>
    </BrowserRouter>
  );
}

export default App;
