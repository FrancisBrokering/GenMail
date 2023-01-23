import {
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  VStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GeneratedText from "../common/GeneratedText";
import GetPlatformLogo from "../../data/GetEditerLogo";
import LanguageInputOutput from "../common/LanguageInputOutput";
import { ChevronDownIcon } from "@chakra-ui/icons";
import SelectTone from "../common/SelectTone";
import { FetchGpt3 } from "../../utility/CommonMethods";

type SnsPostProps = {
  inputLanguage: string;
  outputLanguage: string;
  setInputLanguage: (lang: string) => void;
  setOutputLanguage: (lang: string) => void;
};

const SnsPost = (props: SnsPostProps) => {
  const { t } = useTranslation();
  const [postDescription, setPostDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [platform, setPlatform] = useState("Instagram");
  const [platformOther, setPlatformOther] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResult] = useState(["", "", ""]);
  const [numChars, setNumChars] = useState(0);
  const maxChars = 1500;
  const Countword_color = useColorModeValue("gray.400", "gray.400");
  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");
  const Platform_Color = useColorModeValue("gray.700", "gray.200");
  const Menu_Border = useColorModeValue("gray.200", "gray.600");
  const Platforms = [
    "Instagram",
    "Facebook",
    "Twitter",
    "Linkedin",
    t("other"),
  ];

  async function handleSubmit(event: React.FormEvent) {
    const platformToUse = platformOther != "" ? platformOther : platform;
    const instruction =
      "Create an English post using the following information\n\n" +
      "1 Platform: " +
      platformToUse +
      "\n" +
      "2 About: " +
      postDescription +
      "\n" +
      "3 Tone: " +
      tone;

    FetchGpt3(
      setIsGenerating,
      setResult,
      instruction,
      event,
      "text-davinci-003"
    );
  }

  useEffect(() => {
    setNumChars(postDescription.length);
  }, [postDescription]);

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <VStack alignItems={"left"} spacing={"40px"}>
            <LanguageInputOutput
              pageTitle={t("sns.SnsPost.pageTitle")}
              setInputLanguage={props.setInputLanguage}
              setOutputLanguage={props.setOutputLanguage}
              inputLanguage={props.inputLanguage}
              outputLanguage={props.outputLanguage}
              className={"first-step"}
            />
            <Box>
              <FormLabel>② {t("sns.SnsPost.platform")}</FormLabel>
              <Flex>
                <Menu>
                  <MenuButton
                    className="second-step"
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
              <FormLabel>③ {t("sns.SnsPost.about")}</FormLabel>
              <Textarea
                className="third-step"
                name="description"
                minH="200px"
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
                placeholder={t("sns.SnsPost.examples.about") as string}
                _placeholder={{ color: Placeholder_Color }}
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
            <SelectTone setTone={setTone} />
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
              {t("sns.SnsPost.button")}
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

export default SnsPost;
