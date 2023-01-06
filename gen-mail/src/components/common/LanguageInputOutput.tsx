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
  const { t } = useTranslation();
  return (
    <Box mb="20px">
      <Text textAlign="center" mb="50px" fontWeight="bold" fontSize="20px">
        {props.pageTitle}
      </Text>
      <FormLabel>①入力言語を選択してください</FormLabel>
      <Flex mb="20px">
        <Flex direction="column">
          <Select onChange={(e) => props.setLanguage(e.target.value)} w="300px">
            <option value="ja">JP 🇯🇵</option>
            <option value="en">EN 🇺🇸</option>
          </Select>
        </Flex>
        <Center pl="20px" pr="20px">
          <ArrowRightIcon w={6} h={6} color="cyan.400" />
        </Center>
        <Select w="300px">
          <option value="en">EN 🇺🇸</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default LanguageInputOutput;
