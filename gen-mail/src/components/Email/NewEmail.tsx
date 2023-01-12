import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  VStack,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GeneratedText from "../common/GeneratedText";
import LanguageInputOutput from "../common/LanguageInputOutput";
import SelectTone from "../common/SelectTone";
import {
  FetchDavinci,
  getLanguageInEnglish,
} from "../../utility/CommonMethods";

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
    FetchDavinci(setIsGenerating, setResult, instruction, event);
  }

  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");

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
            />
            <Box>
              <FormLabel>②{t("email.newEmail.about")}</FormLabel>
              <Textarea
                name="description"
                value={emailDescription}
                onChange={(e) => setEmailDescription(e.target.value)}
                placeholder={t("email.newEmail.examples.about") as string}
                _placeholder={{ color: Placeholder_Color }}
                required
              />
            </Box>
            <Box>
              <FormLabel>③{t("email.newEmail.who")}</FormLabel>
              <Input
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
              bg="cyan.400"
              _hover={{ bg: "#7dc5ea" }}
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
      <Box maxW="100%" whiteSpace="pre-wrap" pb="100px">
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
