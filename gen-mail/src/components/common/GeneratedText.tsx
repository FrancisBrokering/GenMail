import {
  Box,
  Text,
  useClipboard,
  Divider,
  Button,
  Flex,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

type GeneratedTextProps = {
  result: string;
  index: number;
};

const GeneratedText = (props: GeneratedTextProps) => {
  const { t } = useTranslation();
  const { onCopy, setValue, hasCopied } = useClipboard("");
  const [lines, setlines] = useState(0);
  const [maxLineLength, setMaxLineLength] = useState(0);

  const Hover_Color = useColorModeValue("gray.100", "gray.600");

  useEffect(() => {
    setValue(props.result);
    setlines(props.result.split("\n").length);
    setMaxLineLength(props.result.split("\n").reduce(function(a, b) {
      return Math.max(a, b.length);
    }, 0));
  }, []);

  // useEffect(() => {
  //   lines = props.result.split("\n").length;
  //   maxLineLength = props.result.split("\n").reduce(function(a, b) {
  //     return Math.max(a, b.length);
  //   }, 0);
  // }, [props.result]);

  return (
    <>
      <Divider mt="10px" orientation="horizontal" />
      <Flex direction="column" mt="40px" bg={"transparent"}>
        <Flex justifyContent={"space-between"} mb="5px">
          <Text fontWeight="bold">
            {" "}
            {t("email.option")} {props.index + 1}
          </Text>
          <Button
            colorScheme="blue"
            bg="cyan.400"
            _hover={{ bg: "#7dc5ea" }}
            variant="solid"
            w="90px"
            color="white"
            onClick={onCopy}
          >
            {hasCopied ? t("copied") : t("copy")}
          </Button>
        </Flex>
        <Box rounded="5px" _hover={{ bg: Hover_Color }} key={props.index}>
          <Textarea cols={maxLineLength} rows={lines+3}  value={props.result.replace(/^\s+|\s+$/g, "")}>
            {/* <Text>
              {props.result.replace(/^\s+|\s+$/g, "")}
            </Text> */}
          </Textarea>
        </Box>
      </Flex>
    </>
  );
};

export default GeneratedText;
