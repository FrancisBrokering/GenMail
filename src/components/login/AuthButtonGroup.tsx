import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormErrorMessage,
  VisuallyHidden,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as GoogleIcon } from "../../assets/icons/loginPageIcons/googleIcon.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/loginPageIcons/facebookIcon.svg";
import { ReactComponent as GitHubIcon } from "../../assets/icons/loginPageIcons/githubIcon.svg";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubAuthProvider,
} from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const providers = [
  { name: "Google", icon: <GoogleIcon height="20px" /> },
  { name: "Facebook", icon: <FacebookIcon height="20px" /> },
  { name: "GitHub", icon: <GitHubIcon height="20px" /> },
];

export const OAuthButtonGroup = () => {
  const { t } = useTranslation();
  const [userEmail, setUserEmail] = useState<string | null>("");
  const [
    accountExistsWithDifferentCredential,
    setAccountExistsWithDifferentCredential,
  ] = useState(false);
  const navigate = useNavigate();
  const signInMethods = (method: string) => {
    console.log("login trying");
    switch (method) {
      case "Google":
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            setUserEmail(result.user.email);
            localStorage.setItem("email", result.user.email as string); //probably not good for security
            console.log("user id: " + result.user.uid);
            console.log("login successful");
          })
          .catch((error) => {
            console.log(error.code as string);
            if (
              (error.code as string) ===
              "auth/account-exists-with-different-credential"
            ) {
              setAccountExistsWithDifferentCredential(true);
            }
          });
        break;
      case "Facebook":
        signInWithPopup(auth, facebookProvider)
          .then((result) => {
            setUserEmail(result.user.email);
            console.log("login successful");
          })
          .catch((error) => {
            console.log(error.code as string);
            if (
              (error.code as string) ===
              "auth/account-exists-with-different-credential"
            ) {
              setAccountExistsWithDifferentCredential(true);
            }
          });
        break;
      case "GitHub":
        signInWithPopup(auth, githubAuthProvider)
          .then((result) => {
            setUserEmail(result.user.email);
            console.log("login successful");
          })
          .catch((error) => {
            console.log(error.code as string);
            if (
              (error.code as string) ===
              "auth/account-exists-with-different-credential"
            ) {
              setAccountExistsWithDifferentCredential(true);
            }
          });
        break;
    }
  };

  useEffect(() => {
    console.log(userEmail);
  }, [userEmail]);

  return (
    <Box>
      <ButtonGroup variant="outline" spacing="4" width="full">
        {providers.map(({ name, icon }) => (
          <Button
            key={name}
            width="full"
            onClick={() => {
              signInMethods(name);
            }}
          >
            <VisuallyHidden>Sign in with {name}</VisuallyHidden>
            {icon}
          </Button>
        ))}
      </ButtonGroup>
      {!accountExistsWithDifferentCredential ? (
        <></>
      ) : (
        <Text mt="8px" color="red.500" fontSize="sm">
          {t("login.differentCredentials")}
        </Text>
      )}
    </Box>
  );
};
