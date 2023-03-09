import React from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "./AuthButtonGroup";
import { LoginPagePasswordField } from "./LoginPagePasswordField";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type LoginFormProps = {
  loginEmail: string;
  setLoginEmail: (loginEmail: string) => void;
  loginPassword: string;
  setLoginPassword: (loginPassword: string) => void;
  registerEmail: string;
  setRegisterEmail: (registerEmail: string) => void;
  registerPassword: string;
  setRegisterPassword: (registerPassword: string) => void;
  isNewUser: boolean;
  invalidEmail: boolean;
  setInvalidEmail: (invalidEmail: boolean) => void;
  invalidPassword: boolean;
  setInvalidPassword: (invalidPassword: boolean) => void;
  registerWithEmail: () => void;
  loginWithEmail: () => void;
};

const LoginForm = (props: LoginFormProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (props.isNewUser) {
      props.setInvalidEmail(false);
      props.setInvalidPassword(false);
      props.setLoginEmail("");
      props.setLoginPassword("");
    }
  }, []);

  return (
    <Box
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={{ base: "white", sm: "bg-surface" }}
      boxShadow={{ base: "none", sm: "md" }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isInvalid={props.invalidEmail}>
            <FormLabel htmlFor="email">{t("login.email")}</FormLabel>
            <Input
              id="email"
              type="email"
              value={props.isNewUser ? props.registerEmail : props.loginEmail}
              onChange={(event) => {
                props.isNewUser
                  ? props.setRegisterEmail(event.target.value)
                  : props.setLoginEmail(event.target.value);
              }}
            />
            {!props.invalidEmail ? (
              <></>
            ) : (
              <FormErrorMessage>{t("login.notRegistered")}</FormErrorMessage>
            )}
          </FormControl>
          <LoginPagePasswordField
            loginPassword={props.loginPassword}
            registerPassword={props.registerPassword}
            isNewUser={props.isNewUser}
            setLoginPassword={props.setLoginPassword}
            setRegisterPassword={props.setRegisterPassword}
            invalidPassword={props.invalidPassword}
          />
        </Stack>
        {!props.isNewUser && (
          <HStack justify="space-between">
            <Checkbox defaultChecked>{t("login.remember")}</Checkbox>
            <Button
              variant="link"
              colorScheme="blue"
              size="sm"
              onClick={() => navigate("/resetPassword")}
            >
              {t("login.forgot")}
            </Button>
          </HStack>
        )}
        <Stack spacing="6">
          {props.isNewUser ? (
            <Button colorScheme="blue" onClick={props.registerWithEmail}>
              {t("login.signup")}
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={props.loginWithEmail}>
              {t("login.login")}
            </Button>
          )}
          <HStack>
            <Divider />
            <Text fontSize="sm" whiteSpace="nowrap" color="muted">
              {t("login.continue")}
            </Text>
            <Divider />
          </HStack>
          <OAuthButtonGroup />
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginForm;
