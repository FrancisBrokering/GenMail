import {
  Box,
  Text,
  useClipboard,
  Divider,
  Button,
  Flex,
  useColorModeValue,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { FetchDeepL, FetchGpt3 } from "../../utility/CommonMethods";

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
  const [isLargerThan848] = useMediaQuery("(min-width: 800px)");
  const Option_Bg = useColorModeValue("blue.100", "blue.100");

  const Hover_Color = useColorModeValue("gray.100", "gray.600");

  useEffect(() => {
    setlines(props.result.split("\n").length);
    setMaxLineLength(
      props.result.split("\n").reduce(function (a, b) {
        return Math.max(a, b.length);
      }, 0)
    );
  }, []);

  useEffect(() => {
    setTextareaValue(props.result.replace(/^\s+|\s+$/g, ""));
    setValue(props.result.replace(/^\s+|\s+$/g, ""));
  }, [props.result]);

  async function handleTranslate(event: React.MouseEvent<HTMLElement>) {
    if (translatedText[0] != "") {
      return;
    }
    FetchDeepL(setIsGenerating, setTranslatedText, props.result, event);
  }

  useEffect(() => {
    setTextareaValue(props.result.replace(/^\s+|\s+$/g, ""));
  }, [translatedText]);

  useEffect(() => {
    setDisplayTranslatedText(false);
  }, [props.result]);

  return (
    <Box padding={"10px"}>
      <Flex direction="column" bg={"transparent"}>
        <Flex justifyContent={"space-between"} mb="5px">
          <Box bg={""}>
            <Text fontWeight="bold" fontSize={"20px"}>
              {" "}
              {t("email.option")} {props.index + 1}
            </Text>
          </Box>

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
        <Divider mt="10px" orientation="horizontal" />
        <Box rounded="5px" _hover={{ bg: Hover_Color }} key={props.index}>
          {/* {isLargerThan848 ? (
            <Text margin="5px 5px 5px 5px">
              {props.result.replace(/^\s+|\s+$/g, "")}
            </Text>
          ) : ( */}
          <Textarea
            onChange={(event) => {
              setTextareaValue(event.target.value);
              setValue(event.target.value);
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
          {/* )} */}
        </Box>
      </Flex>
    </Box>
  );
};

export default GeneratedText;
