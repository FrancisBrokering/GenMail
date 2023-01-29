import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useClipboard,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { ElementRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import Editor from "./Editor";

const countWords = (str: string) => {
  const arr = str.split(" ");
  return arr.filter((word) => word !== "").length;
};

const EditArea = () => {
  const editorRef = useRef<ElementRef<typeof Editor>>(null);
  const { onCopy, value, setValue, hasCopied } = useClipboard("", {
    format: "text/html",
  });
  const { t } = useTranslation();
  const Editor_BorderColor = useColorModeValue("#e2e8f0", "gray.600");
  const Editor_Bg = useColorModeValue("white", "gray.700");
  const Button_Bg = useColorModeValue("#0768d2", "#0768d2");
  const Button_Bg_Hover = useColorModeValue("#005dc1", "#1b73d2");
  // const [isLargerThan1160] = useMediaQuery('(min-width: 1160px)');

  return (
    <Box
      borderTop={"1px solid #e2e8f0"}
      borderLeft={"1px solid #e2e8f0"}
      borderBottom={"1px solid #e2e8f0"}
      borderRight={"1px solid #e2e8f0"}
      borderColor={Editor_BorderColor}
      borderRadius="10px"
      bg={Editor_Bg}
      display={{ base: "none", md: "flex" }}
      // display={isLargerThan1160 ? "flex" : "none"}
      flexDirection="column"
    >
      <Editor ref={editorRef}></Editor>
      <Flex margin={"40px 20px"} justifyContent="right">
        <Button
          onClick={() => {
            editorRef.current?.getHTML(function (html) {
              setValue(html);
              setTimeout(() => {
                onCopy();
              }, 0);
            });
          }}
          mt={2}
          bg={Button_Bg}
          width={"100px"}
          _hover={{ bg: Button_Bg_Hover }}
          color={"white"}
        >
          {hasCopied ? t("copied") : t("copy")}
        </Button>
        {/* <Spacer /> */}
        {/* <Text>Words: {countWords(value)}</Text> */}
      </Flex>
    </Box>
  );
};

export default EditArea;
