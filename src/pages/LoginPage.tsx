import React from "react";
import { Box, Container, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoginPageHeader from "../components/login/LoginPageHeader";
import LoginForm from "../components/login/LoginForm";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState({});

  //TODO: not sure if this is good to keep this running
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      navigate("/");
    }
  });

  const registerWithEmail = async () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        console.log("Signed in:", userCredential);
        // const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginWithEmail = async () => {
    setInvalidEmail(false);
    setInvalidPassword(false);
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        console.log("logged in:", userCredential);
        console.log("user credentials: ", userCredential.user);
        // const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.code as string);
        if ((error.code as string) === "auth/invalid-email") {
          console.log("invalid email");
          setInvalidEmail(true);
        }
        if ((error.code as string) === "auth/user-not-found") {
          console.log("user not found");
          setInvalidEmail(true);
        }
        if ((error.code as string) === "auth/wrong-password") {
          console.log("wrong password");
          setInvalidPassword(true);
        }
      });
  };

  return (
    <Box bg="linear-gradient(80deg, #1f0098 0%, #05d7f0 100%);" h="100vh">
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", md: "8" }}
      >
        <Stack spacing="8">
          <LoginPageHeader setIsNewUser={setIsNewUser} isNewUser={isNewUser} />
          <LoginForm
            loginEmail={loginEmail}
            loginPassword={loginPassword}
            registerEmail={registerEmail}
            registerPassword={registerPassword}
            isNewUser={isNewUser}
            invalidEmail={invalidEmail}
            setInvalidEmail={setInvalidEmail}
            invalidPassword={invalidPassword}
            setInvalidPassword={setInvalidPassword}
            setLoginEmail={setLoginEmail}
            setLoginPassword={setLoginPassword}
            setRegisterEmail={setRegisterEmail}
            setRegisterPassword={setRegisterPassword}
            registerWithEmail={registerWithEmail}
            loginWithEmail={loginWithEmail}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginPage;
