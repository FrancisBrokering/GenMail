import {
  Box,
  Text,
  FormLabel,
  Divider,
  Button,
  Flex,
  Select,
  Center,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";

type LanguageInputOutputProps = {
  pageTitle: string;
  setLanguage: (language: string) => void;
};

const LanguageInputOutput = (props: LanguageInputOutputProps) => {
  const { t, i18n } = useTranslation();
  return (
    <Box>
      <Text textAlign="center" mb="50px" fontWeight="bold" fontSize="20px">
        {props.pageTitle}
      </Text>
      <FormLabel>①{t("selectLang")}</FormLabel>
      <Flex>
        <Select onChange={(e) => props.setLanguage(e.target.value)} w="300px">
          <option value="ja">{t("japanese")} 🇯🇵</option>
          <option value="en">{t("english")} 🇺🇸</option>
        </Select>
        <Center pl="20px" pr="20px">
          <ArrowRightIcon w={6} h={6} color="cyan.400" />
        </Center>
        <Select w="300px">
          <option value="en">{t("english")} 🇺🇸</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default LanguageInputOutput;
