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
import { FetchGpt3 } from "../../utility/CommonMethods";

type GeneratedTextProps = {
  result: string;
  index: number;
};

const GeneratedText = (props: GeneratedTextProps) => {
  const { t } = useTranslation();
  const { onCopy, setValue, hasCopied } = useClipboard("");
  const [lines, setlines] = useState(0);
  const [maxLineLength, setMaxLineLength] = useState(0);
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState([""]);
  const [displayTranslatedText, setDisplayTranslatedText] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  const Hover_Color = useColorModeValue("gray.100", "gray.600");

  useEffect(() => {
    setValue(props.result);
    setlines(props.result.split("\n").length);
    setMaxLineLength(
      props.result.split("\n").reduce(function (a, b) {
        return Math.max(a, b.length);
      }, 0)
    );
  }, []);

  useEffect(() => {
    setTextareaValue(props.result.replace(/^\s+|\s+$/g, ""));
  }, [props.result]);

  async function handleTranslate(event: React.MouseEvent<HTMLElement>) {
    if (translatedText[0] != "") {
      return;
    }
    const instruction =
      "translate the following sentence to Japanese: \n" + props.result;
    console.log("instruction!!!!!!!!!: ", instruction);
    FetchGpt3(
      setIsGenerating,
      setTranslatedText,
      instruction,
      event,
      "text-davinci-003"
    );
  }

  useEffect(() => {
    console.log("passed: ", translatedText);
    setTextareaValue(props.result.replace(/^\s+|\s+$/g, ""));
  }, [translatedText]);

  return (
    <>
      <Divider mt="10px" orientation="horizontal" />
      <Flex direction="column" mt="40px" bg={"transparent"}>
        <Flex justifyContent={"space-between"} mb="5px">
          <Text fontWeight="bold">
            {" "}
            {t("email.option")} {props.index + 1}
          </Text>

          <Box>
            <Button
              colorScheme="blue"
              bg="cyan.400"
              _hover={{ bg: "#7dc5ea" }}
              variant="solid"
              color="white"
              onClick={(event) => {
                handleTranslate(event);
                setDisplayTranslatedText(!displayTranslatedText);
              }}
              mr="10px"
              isLoading={isGenerating}
              loadingText={isGenerating ? (t("translating") as string) : ""}
            >
              {displayTranslatedText ? t("original") : t("translate")}
            </Button>
            <Button
              colorScheme="blue"
              bg="#0768d2"
              _hover={{ bg: "#0553a8" }}
              variant="solid"
              w="90px"
              color="white"
              onClick={onCopy}
            >
              {hasCopied ? t("copied") : t("copy")}
            </Button>
          </Box>
        </Flex>
        <Box rounded="5px" _hover={{ bg: Hover_Color }} key={props.index}>
          <Textarea
            onChange={(event) => {
              setTextareaValue(event.target.value);
            }}
            isReadOnly={displayTranslatedText ? true : false}
            cols={maxLineLength}
            rows={lines + 3}
            value={
              displayTranslatedText && !isGenerating
                ? translatedText[0].replace(/^\s+|\s+$/g, "")
                : textareaValue
            }
          />
        </Box>
      </Flex>
    </>
  );
};

export default GeneratedText;
