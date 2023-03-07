import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  VStack,
  useColorModeValue,
  Textarea,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageInputOutput from "../common/LanguageInputOutput";
import SelectTone from "../common/SelectTone";
import { FetchGpt3, getLanguageInEnglish } from "../../utility/CommonMethods";
import InstructionStep from "../common/InstructionStep";
import SelectReceiver from "../common/SelectReceiver";

type NewEmailProps = {
  inputLanguage: string;
  outputLanguage: string;
  setInputLanguage: (lang: string) => void;
  setOutputLanguage: (lang: string) => void;
  setResult: (results: string[]) => void;
};

const NewEmail = (props: NewEmailProps) => {
  const { t } = useTranslation();
  const [emailDescription, setEmailDescription] = useState("");
  const [tone, setTone] = useState("");
  const [receiver, setReceiver] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [numChars, setNumChars] = useState(0);
  const maxChars = 1500;
  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");
  const Countword_color = useColorModeValue("gray.400", "gray.400");
  const Button_Bg = useColorModeValue("#0768d2", "#0768d2");
  const Button_Bg_Hover = useColorModeValue("#005dc1", "#1b73d2");
  const [currentStep, setCurrentStep] = useState(1);

  async function handleSubmit(event: React.FormEvent) {
    const instruction =
      "write an email in " +
      getLanguageInEnglish(props.outputLanguage) +
      " using the following information: \n\n" +
      "1 About: " +
      emailDescription +
      "\n" +
      "2 To: " +
      receiver +
      "\n" +
      "3 Tone: " +
      tone;
    FetchGpt3(
      setIsGenerating,
      props.setResult,
      instruction,
      event,
      "text-davinci-003"
    );
  }

  useEffect(() => {
    setNumChars(emailDescription.length);
    if (emailDescription != "") {
      setCurrentStep(2);
    }
  }, [emailDescription]);

  useEffect(() => {
    if (receiver != "") {
      setCurrentStep(3);
    }
  }, [receiver]);

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
              pageTitle={t("email.New.pageTitle") as string}
              setInputLanguage={props.setInputLanguage}
              setOutputLanguage={props.setOutputLanguage}
              inputLanguage={props.inputLanguage}
              outputLanguage={props.outputLanguage}
              page={"New"}
              className={"first-step"}
              currentStep={currentStep}
            />
            <Box>
              {/* <FormLabel>② {t("email.New.about")}</FormLabel> */}
              <InstructionStep
                instructionPrompt={t("email.New.about")}
                stepNumber={2}
                currentStep={currentStep}
              />
              <Textarea
                className="second-step"
                name="description"
                minH="200px"
                value={emailDescription}
                onChange={(e) => setEmailDescription(e.target.value)}
                placeholder={t("email.New.examples.about") as string}
                _placeholder={{ color: Placeholder_Color }}
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
            <SelectReceiver
              setReceiver={setReceiver}
              currentStep={currentStep}
              receiver={receiver}
            />
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
              bgGradient="linear(to-l, #17A8E5, #0968D3)"
            >
              {t("email.New.button")}
            </Button>
          </VStack>
        </FormControl>
      </form>
    </Box>
  );
};

export default NewEmail;
