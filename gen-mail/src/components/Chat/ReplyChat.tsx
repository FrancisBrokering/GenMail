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
import GeneratedText from "../common/GeneratedText";
import LanguageInputOutput from "../common/LanguageInputOutput"
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
    setIsGenerating(true);
    event.preventDefault();
    let details = emailDescription;
    if (emailDescription != "") {
      details = " including the details " + emailDescription + " ";
    }
    const data = {
      dataToSendToGPT3:
        reply +
        "\n\n" +
        "Create a reply to to the above message using the following message: \n\n" +
        "1 About: " +
        details +
        "\n" +
        "2 Tone: " +
        tone
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
    setReply("");
    setEmailDescription("");
  }

  const Placeholder_Color = useColorModeValue("gray.500", "gray.200")

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={'left'} spacing={'40px'}>
            <LanguageInputOutput
              pageTitle={t("chat.replyChat.pageTitle")}
              setLanguage={props.setLanguage}
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
              value={emailDescription}
              onChange={(e) => setEmailDescription(e.target.value)}
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
              loadingText={isGenerating ? t("generating") as string : ''}
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
