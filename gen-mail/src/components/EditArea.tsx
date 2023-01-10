import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Textarea,
  Button,
  useClipboard,
} from "@chakra-ui/react";
import Editor from "./editor/Editor";
import { useTranslation } from "react-i18next";

const countWords = (str: string) => {
  const arr = str.split(" ");
  return arr.filter((word) => word !== "").length;
};

const EditArea = () => {
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  const { t } = useTranslation();

  return (
    <Box
      borderLeft={"1px solid #e2e8f0"}
      borderBottom={"1px solid #e2e8f0"}
      borderRight={"1px solid #e2e8f0"}
      bg={'white'}
      borderRadius='10px'
      pb={'50px'}
    >
      <Editor></Editor>
      <Flex margin={"5px"}>
        <Button
          onClick={onCopy}
          mt={2}
          bg="#0dc5ea"
          width={'100px'}
          _hover={{ bg: "#7dc5ea" }}
          color={"white"}
        >
          {hasCopied ? t("copied") : t("copy")}
        </Button>
        <Spacer />
        <Text>
          Words: {countWords(value)}
        </Text>
      </Flex>
    </Box>
  );
};

export default EditArea;
