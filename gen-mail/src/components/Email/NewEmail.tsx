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
import GeneratedText from "../common/GeneratedText";
import LanguageInputOutput from "../common/LanguageInputOutput";
import SelectTone from "../common/SelectTone";
import { FetchGpt3, getLanguageInEnglish } from "../../utility/CommonMethods";

type NewEmailProps = {
  inputLanguage: string;
  outputLanguage: string;
  setInputLanguage: (lang: string) => void;
  setOutputLanguage: (lang: string) => void;
};

const NewEmail = (props: NewEmailProps) => {
  const { t } = useTranslation();
  const [emailDescription, setEmailDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [receiver, setReceiver] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);
  const [numChars, setNumChars] = useState(0);
  const maxChars = 1500;
  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");
  const Countword_color = useColorModeValue("gray.400", "gray.400");
  const Button_Bg = useColorModeValue("#0768d2", "#0768d2");
  const Button_Bg_Hover = useColorModeValue("#005dc1", "#1b73d2");

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
      setResult,
      instruction,
      event,
      "text-davinci-003"
    );
  }

  useEffect(() => {
    setNumChars(emailDescription.length);
  }, [emailDescription]);

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={"left"} spacing={"40px"}>
            <LanguageInputOutput
              pageTitle={t("email.newEmail.pageTitle") as string}
              setInputLanguage={props.setInputLanguage}
              setOutputLanguage={props.setOutputLanguage}
              inputLanguage={props.inputLanguage}
              outputLanguage={props.outputLanguage}
              className={"first-step"}
            />
            <Box>
              <FormLabel>② {t("email.newEmail.about")}</FormLabel>
              <Textarea
                className="second-step"
                name="description"
                minH="200px"
                value={emailDescription}
                onChange={(e) => setEmailDescription(e.target.value)}
                placeholder={t("email.newEmail.examples.about") as string}
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
            <Box>
              <FormLabel>③ {t("email.newEmail.who")}</FormLabel>
              <Input
                className="third-step"
                type="text"
                name="receiver"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder={t("email.newEmail.examples.who") as string}
                _placeholder={{ color: Placeholder_Color }}
                required
              />
            </Box>
            <SelectTone setTone={setTone} />
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
              {t("email.newEmail.button")}
            </Button>
          </VStack>
        </FormControl>
      </form>
      <Box maxW="100%" whiteSpace="pre-wrap" pb="70px">
        {results[0] === "" ? (
          <></>
        ) : (
          results.map((r, index) => {
            return <GeneratedText key={index} index={index} result={r} />;
          })
        )}
      </Box>
    </Box>
  );
};

export default NewEmail;
