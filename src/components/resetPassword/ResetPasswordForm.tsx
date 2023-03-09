import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ResetPasswordFormProps = {
  email: string;
  setEmail: (email: string) => void;
  emailSent: boolean;
  isError: boolean;
  userNotFound: boolean;
  resetPasswordViaEmail: () => void;
  invalidEmail: boolean;
};

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.setEmail(e.target.value);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
    <Box
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={{ base: "white", sm: "bg-surface" }}
      boxShadow={{ base: "none", sm: "md" }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <FormControl isInvalid={props.isError}>
        <Stack spacing={4}>
          <FormLabel>{t("resetPassword.email")}</FormLabel>
          <Input
            placeholder="example@gmail.com"
            type="email"
            value={props.email}
            onChange={handleInputChange}
          />
          {props.isError ? (
            <FormErrorMessage>
              {t("resetPassword.required")}
            </FormErrorMessage>
          ) : (
            <></>
          )}
          {props.userNotFound && (
            <FormHelperText color="red.500">
              {t("resetPassword.notFound")}
            </FormHelperText>
          )}
          {props.invalidEmail && (
            <FormHelperText color="red.500">
              {t("resetPassword.invalidEmail")}
            </FormHelperText>
          )}
          {props.emailSent && (
            <Box>
              <FormHelperText>
                {t("resetPassword.emailSentSubtitle")}
              </FormHelperText>
              <Button
                variant="link"
                colorScheme="blue"
                size="sm"
                onClick={() => navigate("/login")}
              >
                {t("resetPassword.back")}
              </Button>
            </Box>
          )}
          {props.emailSent ? (
            <Button colorScheme="blue">
              {t("resetPassword.emailSent")}
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={props.resetPasswordViaEmail}>
              {t("resetPassword.send")}
            </Button>
          )}
        </Stack>
      </FormControl>
    </Box>
  );
};

export default ResetPasswordForm;
