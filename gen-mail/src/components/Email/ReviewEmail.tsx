import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Button,
  Divider,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GeneratedText from "../common/GeneratedText";
import LanguageInputOutput from "../common/LanguageInputOutput"

type ReviewEmailProps = {
  lang: string;
  setLanguage: (lang: string) => void;
};

const ReviewEmail = (props: ReviewEmailProps) => {
  const { t } = useTranslation();
  const [oldEmail, setOldEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);

  useEffect(() => {
    console.log("results is: ", oldEmail);
  }, [oldEmail]);

  async function handleSubmit(event: React.FormEvent) {
    setIsGenerating(true);
    event.preventDefault();
    const data = {
      email:
        props.lang === "en"
          ? "make this email sound better " + oldEmail
          : "このEメールの文法を正しくして。" + oldEmail,
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
  }

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={'left'} spacing={'40px'}>
            <LanguageInputOutput
              pageTitle={t("email.reviewEmail.pageTitle") as string}
              setLanguage={props.setLanguage}
            />
            <Box>
            <FormLabel>②{t("email.reviewEmail.paste")}</FormLabel>
            <Textarea
              minH="200px"
              name="oldEmail"
              value={oldEmail}
              onChange={(e) => setOldEmail(e.target.value)}
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
              {t("email.reviewEmail.button")}
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

export default ReviewEmail;
