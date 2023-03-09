import {
  Box,
  Text,
  Input,
  FormControl,
  Button,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FetchGpt3, getLanguageInEnglish } from "../../utility/CommonMethods";
import GeneratedText from "../common/GeneratedText";
import InstructionStep from "../common/InstructionStep";
import LanguageInputOutput from "../common/LanguageInputOutput";
// import { useTour } from '@reactour/tour'

type EditEmailProps = {
  inputLanguage: string;
  outputLanguage: string;
  setInputLanguage: (lang: string) => void;
  setOutputLanguage: (lang: string) => void;
  setResult: (results: string[]) => void;
};

const EditEmail = (props: EditEmailProps) => {
  const { t } = useTranslation();
  const [editDescription, setEditDescription] = useState("");
  const [oldEmail, setOldEmail] = useState("");
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
    const instruction =
      oldEmail +
      "\n\nRewrite the above email " +
      // getLanguageInEnglish(props.outputLanguage) +
      " using the following instruction: \n\n" +
      editDescription;
    FetchGpt3(
      setIsGenerating,
      props.setResult,
      instruction,
      event,
      "text-davinci-003"
    );
  }

  useEffect(() => {
    setNumChars(oldEmail.length);
  }, [oldEmail]);

  useEffect(() => {
    if (editDescription != "") {
      setCurrentStep(2);
    }
  }, [editDescription]);

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={"left"} spacing={"40px"}>
            <Text
              textAlign="center"
              mb="10px"
              fontWeight="bold"
              fontSize="20px"
            >
              {t("email.Edit.pageTitle")}
            </Text>
            <Box>
              {/* <FormLabel>① {t("email.Edit.paste")}</FormLabel> */}
              <InstructionStep
                instructionPrompt={t("email.Edit.paste")}
                stepNumber={1}
                currentStep={currentStep}
              />
              <Textarea
                minH="200px"
                name="oldEmail"
                value={oldEmail}
                onChange={(e) => setOldEmail(e.target.value)}
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
              {/* <FormLabel>② {t("email.Edit.how")}</FormLabel> */}
              <InstructionStep
                instructionPrompt={t("email.Edit.how")}
                stepNumber={2}
                currentStep={currentStep}
              />
              <Input
                mb={"10px"}
                type="text"
                name="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder={t("email.Edit.examples.how") as string}
                _placeholder={{ color: Placeholder_Color }}
                required
              />
            </Box>
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
              {t("email.Edit.button")}
            </Button>
          </VStack>
        </FormControl>
      </form>
      {/* <Box maxW="100%" whiteSpace="pre-wrap" pb="70px">
        {results[0] === "" ? (
          <></>
        ) : (
          results.map((r, index) => {
            return <GeneratedText key={index} index={index} result={r} />;
          })
        )}
      </Box> */}
    </Box>
  );
};

export default EditEmail;
