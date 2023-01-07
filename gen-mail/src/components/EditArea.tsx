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

const countWords = (str: string) => {
  const arr = str.split(" ");
  return arr.filter((word) => word !== "").length;
};

const EditArea = () => {
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  return (
    <Box
      borderLeft={"1px solid gray"}
      borderBottom={"1px solid gray"}
      borderRight={"1px solid gray"}
    >
      <Editor></Editor>
      <Flex margin={"10px"}>
        <Button
          onClick={onCopy}
          mt={2}
          bg="#0dc5ea"
          _hover={{ bg: "#7dc5ea" }}
          color={"white"}
        >
          {hasCopied ? "Copied" : "Copy"}
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
