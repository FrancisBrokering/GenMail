import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/SideBar";
import EmailPage from "./pages/EmailPage";
import SnsPage from "./pages/SnsPage";
import { useTranslation } from "react-i18next";
import "./App.css";

import { TourProvider } from "@reactour/tour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { steps } from "./tour/steps";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Button, Box, Flex, Text, Icon, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

const LOCAL_STORAGE_KEY = "USER_LANGUAGE";

function App() {
  const [language, setLanguage] = useState("ja");
  const { t, i18n } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

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
  const disableBody = (target: any) => disableBodyScroll(target);
  const enableBody = (target: any) => enableBodyScroll(target);

  return (
    <BrowserRouter>
      <TourProvider
        steps={steps}
        afterOpen={disableBody}
        beforeClose={enableBody}
        badgeContent={({ totalSteps, currentStep }) =>
          currentStep + 1 + "/" + totalSteps
        }
        prevButton={({ currentStep, setCurrentStep, steps }) => {
          const first = currentStep === 0;
          if (currentStep <= 5 && !isLargerThan800) {
            onClose()
          }
          return (
            <Box
              onClick={() => {
                if (first) {
                  if (steps?.length) {
                    setCurrentStep((s) => steps.length - 1);
                  }
                } else {
                  setCurrentStep((s) => s - 1);
                }
              }}
              _hover={{ cursor: "pointer" }}
            >
              <Flex alignItems={"center"}>
                {first ? null : (
                  <Icon as={ArrowBackIcon} boxSize={5} mr={"5px"} />
                )}
                <Text>{first ? "Back" : "Back"}</Text>
              </Flex>
            </Box>
          );
        }}
        nextButton={({
          currentStep,
          stepsLength,
          setIsOpen,
          setCurrentStep,
          steps,
        }) => {
          const last = currentStep === stepsLength - 1;
          if (currentStep >= 5 && !isLargerThan800) {
            onOpen();
          }
          return (
            <Box
              onClick={() => {
                if (last) {
                  setIsOpen(false);
                } else {
                  if (steps?.length) {
                    setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
                  }
                }
              }}
              _hover={{ cursor: "pointer" }}
            >
              <Flex alignItems={"center"}>
                <Text>{last ? "Close" : "Next"}</Text>
                {last ? null : (
                  <Icon as={ArrowForwardIcon} boxSize={5} ml={"5px"} />
                )}
              </Flex>
            </Box>
          );
        }}
        styles={{
          popover: (base) => ({
            ...base,
            "--reactour-accent": "#ef5a3d",
            borderRadius: radius,
          }),
          maskArea: (base) => ({ ...base, rx: radius }),
          badge: (base) => ({ ...base, left: "auto", right: "-0.8125em" }),
          controls: (base) => ({ ...base, marginTop: 30 }),
          close: (base) => ({ ...base, right: "auto", left: 8, top: 8 }),
        }}
      >
        <Sidebar userLanguage={language} setUserLanguage={setLanguage} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <Routes>
            <Route path="/" element={<EmailPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/email" element={<EmailPage />} />
            <Route path="/sns" element={<SnsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
          </Routes>
        </Sidebar>
      </TourProvider>
    </BrowserRouter>
  );
}

export default App;
