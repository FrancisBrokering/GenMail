import React from "react";
import workingPerson from "../../assets/images/workingPerson.gif";
import { Box, Flex, Img, VStack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const BeforeGeneratedText = () => {
  const { t } = useTranslation();
  return (
    <Flex bg="white" direction="column" rounded="8px" border="solid #e2e8f0">
      <Box w="100%" h="60px" bg="#F2F7FF" borderTopRadius="8px" />
      <VStack
        bg="white"
        alignItems="center"
        rounded="8px"
        margin="80px"
        spacing={4}
      >
        <Img src={workingPerson} alt="workingPerson" w="70%" />
        <Text fontWeight="600">{t("noText")}</Text>
        <Text textAlign="center">{t("beforeGeneratedText")}</Text>
      </VStack>
    </Flex>
  );
};

export default BeforeGeneratedText;
