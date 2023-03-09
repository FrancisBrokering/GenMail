import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FetchGpt3 } from "../../utility/CommonMethods";
import GeneratedText from "../common/GeneratedText";
import InstructionStep from "../common/InstructionStep";
import LanguageInputOutput from "../common/LanguageInputOutput";
import SelectTone from "../common/SelectTone";

type SnsChatProps = {
  inputLanguage: string;
  outputLanguage: string;
  setInputLanguage: (lang: string) => void;
  setOutputLanguage: (lang: string) => void;
  setResult: (results: string[]) => void;
};

const SnsChat = (props: SnsChatProps) => {
  const { t } = useTranslation();
  const [messageDescription, setMessageDescription] = useState("");
  const [tone, setTone] = useState("");
  const [reply, setReply] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  // const [results, setResult] = useState(["", "", ""]);
  const [numChars, setNumChars] = useState(0);
  const maxChars = 1500;
  const Countword_color = useColorModeValue("gray.400", "gray.400");
  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");
  const Button_Bg = useColorModeValue("#0768d2", "#0768d2");
  const Button_Bg_Hover = useColorModeValue("#005dc1", "#1b73d2");
  const [currentStep, setCurrentStep] = useState(1);

  async function handleSubmit(event: React.FormEvent) {
    let details = messageDescription;
    if (messageDescription != "") {
      details = "\n\n2 reply details: " + "'" + messageDescription + "' ";
    }
    const instruction =
      reply +
      "\n\n" +
      "Create a reply to to the above message in English using the following information: \n\n" +
      "" +
      "1 Tone: " +
      tone +
      details;

    FetchGpt3(
      setIsGenerating,
      props.setResult,
      instruction,
      event,
      "text-davinci-003"
    );
  }

  useEffect(() => {
    setNumChars(reply.length);
    if (reply != "") {
      setCurrentStep(2);
    }
  }, [reply]);

  useEffect(() => {
    if (messageDescription != "") {
      setCurrentStep(3);
    }
  }, [messageDescription]);

  useEffect(() => {
    if (tone != "") {
      setCurrentStep(4);
    }
  }, [tone]);

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={"left"} spacing={"40px"}>
            <LanguageInputOutput
              pageTitle={t("sns.Chat.pageTitle")}
              setInputLanguage={props.setInputLanguage}
              setOutputLanguage={props.setOutputLanguage}
              inputLanguage={props.inputLanguage}
              outputLanguage={props.outputLanguage}
              page={"Chat"}
              className="first-step"
              currentStep={currentStep}
            />
            <Box>
              {/* <FormLabel>② {t("sns.Chat.paste")}</FormLabel> */}
              <InstructionStep
                instructionPrompt={t("sns.Chat.paste")}
                stepNumber={2}
                currentStep={currentStep}
              />
              <Textarea
                minH="200px"
                name="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                maxLength={maxChars}
                required
              />
              <Text
                position={"absolute"}
                right={"2px"}
                fontSize="sm"
                color={Countword_color}
              >
                {numChars} / {maxChars}
              </Text>
            </Box>
            <Box>
              {/* <FormLabel>③ {t("sns.Chat.what")}</FormLabel> */}
              <InstructionStep
                instructionPrompt={t("sns.Chat.what")}
                stepNumber={3}
                currentStep={currentStep}
              />
              <Input
                type="text"
                name="description"
                value={messageDescription}
                onChange={(e) => setMessageDescription(e.target.value)}
                placeholder={t("sns.Chat.examples.what") as string}
                _placeholder={{ color: Placeholder_Color }}
              />
            </Box>
            <SelectTone
              setTone={setTone}
              currentStep={currentStep}
              tone={tone}
            />
            <Button
              color="white"
              colorScheme="blue"
              bg={Button_Bg}
              _hover={{ bg: Button_Bg_Hover }}
              variant="solid"
              type="submit"
              isLoading={isGenerating}
              loadingText={isGenerating ? (t("generating") as string) : ""}
            >
              {t("sns.Chat.button")}
            </Button>
          </VStack>
        </FormControl>
      </form>
    </Box>
  );
};

export default SnsChat;
