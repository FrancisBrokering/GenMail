import React from "react";
import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type LoginPageHeaderProps = {
  setIsNewUser: (isNewUser: boolean) => void;
  isNewUser: boolean;
};

const LoginPageHeader = (props: LoginPageHeaderProps) => {
  const { t, i18n } = useTranslation();
  return (
    <Stack spacing="6">
      {/* <SpeaktocodeLogo /> */}
      <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
        <Heading
          size={{ base: "xs", md: "sm" }}
          color="white"
          textAlign="center"
        >
          {props.isNewUser ? t("login.titleSignup") : t("login.title")}
        </Heading>
        <HStack spacing="1" justify="center">
          {props.isNewUser ? (
            <>
              <Text color="white">{t("login.subtitleSignup")}</Text>
              <Button
                variant="link"
                color="white"
                onClick={() => {
                  props.setIsNewUser(false);
                }}
                textDecoration="underline"
              >
                {t("login.login")}
              </Button>
            </>
          ) : (
            <>
              <Text color="white" alignContent="center">
                {t("login.subtitle")}
              </Text>
              <Button
                variant="link"
                color="#fff"
                onClick={() => {
                  props.setIsNewUser(true);
                }}
                textDecoration="underline"
              >
                {t("login.signup")}
              </Button>
            </>
          )}
        </HStack>
      </Stack>
    </Stack>
  );
};

export default LoginPageHeader;
