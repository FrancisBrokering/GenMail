import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Divider,
  Select,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GeneratedText from "../common/GeneratedText";
import LanguageInputOutput from "../common/LanguageInputOutput"


type EditEmailProps = {
  lang: string;
  setLanguage: (lang: string) => void;
};

const EditEmail = (props: EditEmailProps) => {
  const { t } = useTranslation();
  const [editDescription, setEditDescription] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);

  async function handleSubmit(event: React.FormEvent) {
    setIsGenerating(true);
    event.preventDefault();
    const data = {
      email:
        props.lang === "en"
          ? oldEmail +
            ": Edit this email using the following instruction: " +
            editDescription
          : oldEmail +
            ": このEメールを以下の指示を使って編集しろ: " +
            editDescription,
    };
    console.log("data is: ", data);
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
    setOldEmail("");
    setEditDescription("");
  }

  const Placeholder_Color = useColorModeValue("gray.700", "gray.200")

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={'left'} spacing={'40px'}>
            <LanguageInputOutput
              pageTitle={t("email.editEmail.pageTitle") as string}
              setLanguage={props.setLanguage}
            />
            <Box>
              <FormLabel>②{t("email.editEmail.paste")}</FormLabel>
              <Textarea
                minH="200px"
                name="oldEmail"
                value={oldEmail}
                onChange={(e) => setOldEmail(e.target.value)}
                required
              />
            </Box>
            <Box>
              <FormLabel>③{t("email.editEmail.how")}</FormLabel>
              <Input
                type="text"
                name="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder={t("email.editEmail.examples.how") as string}
                _placeholder={{ color: Placeholder_Color }}
                required
              />
            </Box>
            <Box>
            <Button
              colorScheme="blue"
              bg="cyan.400"
              width={'100px'}
              _hover={{ bg: "#7dc5ea" }}
              variant="solid"
              type="submit"
              isLoading={isGenerating}
              loadingText={isGenerating ? t("generating") as string : ''}
            >
              {t("email.editEmail.button")}
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

export default EditEmail;
