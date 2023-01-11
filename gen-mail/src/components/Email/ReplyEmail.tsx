import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FetchDavinci } from "../../utility/CommonMethods";
import GeneratedText from "../common/GeneratedText";
import LanguageInputOutput from "../common/LanguageInputOutput";
import SelectTone from "../common/SelectTone";

type ReplyEmailProps = {
  lang: string;
  setLanguage: (lang: string) => void;
};

const ReplyEmail = (props: ReplyEmailProps) => {
  const { t } = useTranslation();
  const [emailDescription, setEmailDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [reply, setReply] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);

  async function handleSubmit(event: React.FormEvent) {
    let details = emailDescription;
    if (emailDescription != "") {
      details = "2 About: " + emailDescription + " ";
    }
    const instruction =
      reply +
      "\n\n" +
      "Write a reply to the above email in English using the following information: \n\n" +
      "1 Tone: " +
      tone +
      details;

    FetchDavinci(setIsGenerating, setResult, instruction, event);
  }

  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={"left"} spacing={"40px"}>
            <LanguageInputOutput
              pageTitle={t("email.replyEmail.pageTitle") as string}
              setLanguage={props.setLanguage}
            />
            <Box>
              <FormLabel>②{t("email.replyEmail.paste")}</FormLabel>
              <Textarea
                minH="200px"
                name="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
              />
            </Box>
            <Box>
              <FormLabel>③{t("email.replyEmail.what")}</FormLabel>
              <Input
                type="text"
                name="description"
                value={emailDescription}
                onChange={(e) => setEmailDescription(e.target.value)}
                placeholder={t("email.replyEmail.examples.what") as string}
                _placeholder={{ color: Placeholder_Color }}
              />
            </Box>
            <SelectTone setTone={setTone} />
            <Button
              colorScheme="blue"
              bg="cyan.400"
              _hover={{ bg: "#7dc5ea" }}
              variant="solid"
              type="submit"
              isLoading={isGenerating}
              loadingText={isGenerating ? (t("generating") as string) : ""}
            >
              {t("email.replyEmail.button")}
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

export default ReplyEmail;
