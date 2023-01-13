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
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FetchDavinci } from "../../utility/CommonMethods";
import GeneratedText from "../common/GeneratedText";

type ReviewEmailProps = {
  inputLanguage: string;
  outputLanguage: string;
  setInputLanguage: (lang: string) => void;
  setOutputLanguage: (lang: string) => void;
};

const ReviewEmail = (props: ReviewEmailProps) => {
  const { t } = useTranslation();
  const [oldEmail, setOldEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);
  const [numChars, setNumChars] = useState(0);
  const maxChars = 1500;
  const Countword_color = useColorModeValue("gray.400", "gray.400");
  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");

  async function handleSubmit(event: React.FormEvent) {
    const instruction = "Make this email sound better:\n\n" + oldEmail;
    FetchDavinci(setIsGenerating, setResult, instruction, event);
  }

  useEffect(() => {
    setNumChars(oldEmail.length);
  }, [oldEmail]);

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box>
            <Text
              textAlign="center"
              mb="50px"
              fontWeight="bold"
              fontSize="20px"
            >
              {t("email.reviewEmail.pageTitle") as string}
            </Text>
          </Box>
          <VStack alignItems={"left"} spacing={"40px"}>
            <Box>
              <FormLabel>① {t("email.reviewEmail.paste")}</FormLabel>
              <Textarea
                minH="200px"
                name="oldEmail"
                value={oldEmail}
                onChange={(e) => setOldEmail(e.target.value)}
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
              {t("email.reviewEmail.button")}
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

export default ReviewEmail;
