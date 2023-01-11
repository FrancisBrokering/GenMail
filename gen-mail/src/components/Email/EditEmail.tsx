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
import {
  FetchDavinci,
  getLanguageInEnglish,
} from "../../utility/CommonMethods";
import GeneratedText from "../common/GeneratedText";
import LanguageInputOutput from "../common/LanguageInputOutput";

type EditEmailProps = {
  inputLanguage: string;
  outputLanguage: string;
  setInputLanguage: (lang: string) => void;
  setOutputLanguage: (lang: string) => void;
};

const EditEmail = (props: EditEmailProps) => {
  const { t } = useTranslation();
  const [editDescription, setEditDescription] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);

  async function handleSubmit(event: React.FormEvent) {
    const instruction =
      oldEmail +
      "\n\nRewrite the above email in " +
      getLanguageInEnglish(props.outputLanguage) +
      " using the following instruction: \n\n" +
      editDescription;
    FetchDavinci(setIsGenerating, setResult, instruction, event);
  }

  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={"left"} spacing={"40px"}>
            <LanguageInputOutput
              pageTitle={t("email.editEmail.pageTitle") as string}
              setInputLanguage={props.setInputLanguage}
              setOutputLanguage={props.setOutputLanguage}
              inputLanguage={props.inputLanguage}
              outputLanguage={props.outputLanguage}
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
            <Button
              colorScheme="blue"
              bg="cyan.400"
              _hover={{ bg: "#7dc5ea" }}
              variant="solid"
              type="submit"
              isLoading={isGenerating}
              loadingText={isGenerating ? (t("generating") as string) : ""}
            >
              {t("email.editEmail.button")}
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

export default EditEmail;
