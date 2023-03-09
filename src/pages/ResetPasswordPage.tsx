import React, { useEffect, useState } from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import ResetPasswordPageHeader from "../components/resetPassword/ResetPasswordPageHeader";
import ResetPasswordForm from "../components/resetPassword/ResetPasswordForm";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const resetPasswordViaEmail = () => {
    if (email === "") {
      setIsError(true);
      setInvalidEmail(false);
      setUserNotFound(false);
      return;
    }
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
        setIsError(false);
        setUserNotFound(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/user-not-found") {
          console.log("passed here");
          setUserNotFound(true);
          setIsError(false);
          setInvalidEmail(false);
        }
        if (errorCode === "auth/invalid-email") {
          setInvalidEmail(true);
          setIsError(false);
          setUserNotFound(false);
        }
        console.log("Could not send password-reset-email", errorCode);
      });
  };

  return (
    <Box
      position={"absolute"}
      height={"100%"}
      width={"100%"}
      bgGradient="linear(to-tr, #344362 ,#463855)"
      minH="100vh"
    >
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", md: "8" }}
      >
        <ResetPasswordPageHeader />
        <ResetPasswordForm
          email={email}
          setEmail={setEmail}
          emailSent={emailSent}
          isError={isError}
          userNotFound={userNotFound}
          resetPasswordViaEmail={resetPasswordViaEmail}
          invalidEmail={invalidEmail}
        />
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;