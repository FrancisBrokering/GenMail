import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
  Flex,
  VStack,
  useColorModeValue,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GeneratedText from "../common/GeneratedText";
import GetPlatformLogo from "../../data/GetEditerLogo";
import LanguageInputOutput from "../common/LanguageInputOutput";
import { ChevronDownIcon } from "@chakra-ui/icons";

type NewEmailProps = {
  lang: string;
  setLanguage: (lang: string) => void;
};

const NewSns = (props: NewEmailProps) => {
  const { t } = useTranslation();
  const [postDescription, setPostDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [platform, setPlatform] = useState("Instagram");
  const [platformOther, setPlatformOther] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", "", "", ""]);
  const Platforms = [
    "Instagram",
    "Facebook",
    "Twitter",
    "Linkedin",
    t("other"),
  ];

  async function handleSubmit(event: React.FormEvent) {
    setIsGenerating(true);
    event.preventDefault();
    const platformToUse = platformOther != "" ? platformOther : platform;
    const data = {
      dataToSendToGPT3:
        "Create an English post about using the following information\n\n" +
        "1 Platform: " +
        platformToUse +
        "\n" +
        "2 About: " +
        postDescription +
        "\n" +
        "3 Tone: " +
        tone,
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

  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");
  const Platform_Color = useColorModeValue("gray.700", "gray.200");
  const Menu_Border = useColorModeValue("gray.200", "gray.600");

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={"left"} spacing={"40px"}>
            <LanguageInputOutput
              pageTitle={t("sns.newSns.pageTitle")}
              setLanguage={props.setLanguage}
            />
            <Box>
              <FormLabel>②{t("sns.newSns.platform")}</FormLabel>
              <Flex>
                <Menu>
                  <MenuButton
                    as={Button}
                    leftIcon={GetPlatformLogo(platform, "22px", "22px")}
                    rightIcon={<ChevronDownIcon />}
                    variant="outline"
                    borderColor={Menu_Border}
                  >
                    <Text fontWeight="500">{platform}</Text>
                  </MenuButton>
                  <MenuList>
                    {Platforms.map((p) => {
                      return (
                        <MenuItem
                          key={p}
                          minH="48px"
                          onClick={() => {
                            setPlatform(p);
                            setPlatformOther("");
                          }}
                          icon={GetPlatformLogo(p, "22px", "22px")}
                        >
                          <Text color={Platform_Color} fontSize="14px">
                            {p}
                          </Text>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <Box>
                  {platform === t("other") && (
                    <Input
                      ml="20px"
                      type="text"
                      name="platform"
                      onChange={(e) => setPlatformOther(e.target.value)}
                      placeholder={t("other") as string}
                      _placeholder={{ color: Placeholder_Color }}
                    />
                  )}
                </Box>
              </Flex>
            </Box>
            <Box>
              <FormLabel>③{t("sns.newSns.about")}</FormLabel>
              <Input
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
            <Button
              colorScheme="blue"
              bg="cyan.400"
              _hover={{ bg: "#7dc5ea" }}
              variant="solid"
              type="submit"
              isLoading={isGenerating}
              loadingText={isGenerating ? (t("generating") as string) : ""}
            >
              {t("sns.newSns.button")}
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

export default NewSns;
