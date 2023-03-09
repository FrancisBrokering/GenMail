import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const ResetPasswordPageHeader = () => {
  const { t } = useTranslation();
  return (
    <Stack spacing="6" mb="50px">
      <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
        <Heading size={{ base: "sm", md: "lg" }} color="white">
          {t("resetPassword.title")}
        </Heading>
        <Text size={{ base: "xs", md: "sm" }} color="white">
          {t("resetPassword.subtitle")}
        </Text>
      </Stack>
    </Stack>
  );
};

export default ResetPasswordPageHeader;
