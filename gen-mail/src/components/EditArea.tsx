import React, { useRef } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import Editor from "./editor/Editor";
import { useTranslation } from "react-i18next";
import { EditorState } from "lexical";
import {$generateHtmlFromNodes} from '@lexical/html';

const countWords = (str: string) => {
  const arr = str.split(" ");
  return arr.filter((word) => word !== "").length;
};

const EditArea = () => {
  const editorStateRef = useRef<EditorState>();
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  const { t } = useTranslation();
  const Editor_BorderColor = useColorModeValue("#e2e8f0", "gray.600");
  const Editor_Bg = useColorModeValue("white", "gray.700");


  // console.log(copyButtonRef);
  console.log(editorStateRef.current);

  // const htmlString = $generateHtmlFromNodes(editor, selection | null);


  return (
    <Box
      // borderLeft={"1px solid #e2e8f0"}
      borderTop={"1px solid #e2e8f0"}
      borderLeft={"1px solid #e2e8f0"}
      borderBottom={"1px solid #e2e8f0"}
      borderRight={"1px solid #e2e8f0"}
      borderColor={Editor_BorderColor}
      borderRadius="10px"
      // borderTopLeftRadius="10px"
      // borderTopRightRadius="10px"
      bg={Editor_Bg}
      // minHeight="85vh"
    >
      <Editor ref={editorStateRef}></Editor>
      <Flex margin={"40px 20px"}>
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
