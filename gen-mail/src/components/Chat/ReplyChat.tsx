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
  inputLanguage: string;
  outputLanguage: string;
  setInputLanguage: (lang: string) => void;
  setOutputLanguage: (lang: string) => void;
};

const ReplyEmail = (props: ReplyEmailProps) => {
  const { t } = useTranslation();
  const [messageDescription, setMessageDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [reply, setReply] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);

  async function handleSubmit(event: React.FormEvent) {
    let details = messageDescription;
    if (messageDescription != "") {
      details =
        "\n\n2 Reply:  including the details " +
        "'" +
        messageDescription +
        "' ";
    }
    const instruction =
      reply +
      "\n\n" +
      "Create a reply to to the above message in English using the following information: \n\n" +
      "" +
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
              pageTitle={t("chat.replyChat.pageTitle")}
              setInputLanguage={props.setInputLanguage}
              setOutputLanguage={props.setOutputLanguage}
              inputLanguage={props.inputLanguage}
              outputLanguage={props.outputLanguage}
            />
            <Box>
              <FormLabel>②{t("chat.replyChat.paste")}</FormLabel>
              <Textarea
                minH="200px"
                name="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
              />
            </Box>
            <Box>
              <FormLabel>③{t("chat.replyChat.what")}</FormLabel>
              <Input
                type="text"
                name="description"
                value={messageDescription}
                onChange={(e) => setMessageDescription(e.target.value)}
                placeholder={t("chat.replyChat.examples.what") as string}
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
              {t("chat.replyChat.button")}
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

export default ReplyEmail;
