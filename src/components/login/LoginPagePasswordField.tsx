import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useTranslation } from "react-i18next";

type passwordFieldProps = {
  loginPassword: string;
  registerPassword: string;
  isNewUser: boolean;
  setLoginPassword: (loginPassword: string) => void;
  setRegisterPassword: (registerPassword: string) => void;
  invalidPassword: boolean;
};

export const LoginPagePasswordField = (props: passwordFieldProps) => {
  const { t, i18n } = useTranslation();
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <FormControl isInvalid={props.invalidPassword}>
      <FormLabel htmlFor="password">{t("login.password")}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id="password"
          ref={inputRef}
          name="password"
          value={props.isNewUser ? props.registerPassword : props.loginPassword}
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          required
          onChange={(event) => {
            props.isNewUser
              ? props.setRegisterPassword(event.target.value)
              : props.setLoginPassword(event.target.value);
          }}
          // {...props}
        />
      </InputGroup>
      {!props.invalidPassword ? (
        <></>
      ) : (
        <FormErrorMessage>{t("login.wrongPassword")}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default LoginPagePasswordField;
