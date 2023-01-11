import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Divider,
  Select,
  VStack,
  StackDivider,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GeneratedText from "../common/GeneratedText";
import LanguageInputOutput from "../common/LanguageInputOutput"

type NewEmailProps = {
  lang: string;
  setLanguage: (lang: string) => void;
};

const NewEmail = (props: NewEmailProps) => {
  const { t } = useTranslation();
  const [emailDescription, setEmailDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [receiver, setReceiver] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);

  async function handleSubmit(event: React.FormEvent) {
    setIsGenerating(true);
    event.preventDefault();
    const data = {
      dataToSendToGPT3:
        "write an email in English using the following information: \n\n" +
        "1 About: " +
        emailDescription +
        "\n" +
        "2 To: " +
        receiver +
        "\n" +
        "3 Tone: " +
        tone
    };
    const response = await fetch("http://localhost:8080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log("result is: ", json);
    setIsGenerating(false);
    setResult(json.result);
    setReceiver("");
    setEmailDescription("");
  }

  const Placeholder_Color = useColorModeValue("gray.500", "gray.200")

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={'left'} spacing={'40px'}>
            <LanguageInputOutput pageTitle={t("email.newEmail.pageTitle") as string} setLanguage={props.setLanguage} />
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
            <Box>
              <FormLabel>④{t("email.newEmail.tone")}</FormLabel>
              <Select
                placeholder={t("tone.button") as string}
                _placeholder={{ color: Placeholder_Color }}
                onChange={(e) => setTone(e.target.value)}
                required
              >
                <option value={t("tone.friendly") as string}>
                  😊 {t("tone.friendly")}
                </option>
                <option value={t("tone.formal") as string}>
                  💼 {t("tone.formal")}
                </option>
                <option value={t("tone.angry") as string}>
                  🤬 {t("tone.angry")}
                </option>
                <option value={t("tone.casual") as string}>
                  😌 {t("tone.casual")}
                </option>
                <option value={t("tone.professional") as string}>
                  👔 {t("tone.professional")}
                </option>
              </Select>
            </Box>
            <Button
              colorScheme="blue"
              bg="cyan.400"
              _hover={{ bg: "#7dc5ea" }}
              variant="solid"
              type="submit"
              isLoading={isGenerating}
              loadingText={isGenerating ? t("generating") as string : ''}
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
