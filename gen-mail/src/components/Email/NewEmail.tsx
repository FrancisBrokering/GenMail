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
      email:
        props.lang === "en"
          ? "write a " +
            tone +
            " email to " +
            receiver +
            " about " +
            emailDescription +
            "."
          : tone +
            "な口調で" +
            receiver +
            "に" +
            emailDescription +
            "ことについてのメールを英語で書け。",
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

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={'left'} spacing={'40px'}>
            <LanguageInputOutput pageTitle={t("email.newEmail.pageTitle") as string} setLanguage={props.setLanguage} />
            <Box>
              <FormLabel>②{t("email.newEmail.about")}</FormLabel>
              <Input
                bg="white"
                type="text"
                name="description"
                value={emailDescription}
                onChange={(e) => setEmailDescription(e.target.value)}
                placeholder={t("email.newEmail.examples.about") as string}
                required
              />
            </Box>
            <Box>
              <FormLabel>③{t("email.newEmail.who")}</FormLabel>
              <Input
                bg="white"
                type="text"
                name="receiver"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder={t("email.newEmail.examples.who") as string}
                required
              />
            </Box>
            <Box>
              <FormLabel>④{t("email.newEmail.tone")}</FormLabel>
              <Select
                bg="white"
                placeholder={t("tone.button") as string}
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
            <Box>
              <Button
                colorScheme="blue"
                bg="cyan.400"
                width="100px"
                _hover={{ bg: "#7dc5ea" }}
                variant="solid"
                type="submit"
                isLoading={isGenerating}
                loadingText={isGenerating ? t("generating") as string : ''}
              >
                {t("email.newEmail.button")}
              </Button>
            </Box>
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
