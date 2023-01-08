import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Divider,
  Select,
  Flex,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GeneratedText from "../common/GeneratedText";
import GetPlatformLogo from "../../data/GetEditerLogo";
import LanguageInputOutput from "../common/LanguageInputOutput"

const Platforms = ['Instagram', 'Facebook', 'Twitter', 'Linkedin']

type NewEmailProps = {
  lang: string;
  setLanguage: (lang: string) => void;
};

const NewSns = (props: NewEmailProps) => {
  const { t } = useTranslation();
  const [postDescription, setPostDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [platform, setPlatform] = useState("Instagram");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);

  async function handleSubmit(event: React.FormEvent) {
    setIsGenerating(true);
    event.preventDefault();
    const data = {
      email:
        props.lang === "en"
          ? "Create a " + platform + " post about " + postDescription + "."
          : tone +
            "な口調で" +
            postDescription +
            "ことについての" +
            platform +
            "の投稿を英語で作って。",
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
    setPostDescription("");
  }

  const Placeholder_Color = useColorModeValue("gray.700", "gray.200")

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={'left'} spacing={"40px"}>
            <LanguageInputOutput
              pageTitle={t("sns.newSns.pageTitle")}
              setLanguage={props.setLanguage}
            />
            <Box>
              <FormLabel>②{t("sns.newSns.platform")}</FormLabel>
              {/* <Select mb='20px' placeholder={t("sns.platform.button") as string} onChange={(e) => setPlatform(e.target.value)}>
                            <option value={t("sns.platform.instagram") as string}>{t("sns.platform.instagram")}</option>
                            <option value={t("sns.platform.twitter") as string}>{t("sns.platform.facebook")}</option>
                            <option value={t("sns.platform.twitter") as string}>{t("sns.platform.twitter")}</option>
                            <option value={t("sns.platform.youtube") as string}>{t("sns.platform.youtube")}</option>
                        </Select> */}
              <Flex mb="20px">
                {Platforms.map((p) => {
                  return (
                    <Button
                      key={p}
                      variant={'outline'}
                      onClick={() => setPlatform(p)}
                      bg={platform === p ? "cyan.400" : "white"}
                      _hover={{ bg: "#7dc5ea" }}
                      mr="5px"
                    >
                      {GetPlatformLogo(p, '22px', '22px')}
                      <Text color={"gray.700"} fontSize='14px'>
                        {p}
                      </Text>
                    </Button>
                  )
                })}
                <Box>
                  <Input
                    type="text"
                    name="platform"
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="その他"
                    _placeholder={{ color: Placeholder_Color }}
                  ></Input>
                </Box>
              </Flex>
            </Box>
            <Box>
              <FormLabel>③{t("sns.newSns.about")}</FormLabel>
              <Input
                mb="20px"
                type="text"
                name="description"
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
                placeholder={t("sns.newSns.examples.about") as string}
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
            <Box>
              <Button
                colorScheme="blue"
                bg="cyan.400"
                width={"100px"}
                _hover={{ bg: "#7dc5ea" }}
                variant="solid"
                type="submit"
                isLoading={isGenerating}
                loadingText={isGenerating ? t("generating") as string : ''}
              >
                {t("sns.newSns.button")}
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

export default NewSns;
