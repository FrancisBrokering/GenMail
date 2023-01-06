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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GeneratedText from "../common/GeneratedText";
import { ReactComponent as Instagram } from "../../assets/icons/Instagram.svg";
import { ReactComponent as Twitter } from "../../assets/icons/Twitter.svg";
import { ReactComponent as Facebook } from "../../assets/icons/Facebook.svg";
import { ReactComponent as Linkedin } from "../../assets/icons/Linkedin.svg";

type NewEmailProps = {
  lang: string;
};

const NewSns = (props: NewEmailProps) => {
  const { t } = useTranslation();
  const [postDescription, setPostDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [platform, setPlatform] = useState("");
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

  return (
    <Box position={"relative"}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>②{t("sns.newSns.platform")}</FormLabel>
          {/* <Select mb='20px' placeholder={t("sns.platform.button") as string} onChange={(e) => setPlatform(e.target.value)}>
                        <option value={t("sns.platform.instagram") as string}>{t("sns.platform.instagram")}</option>
                        <option value={t("sns.platform.twitter") as string}>{t("sns.platform.facebook")}</option>
                        <option value={t("sns.platform.twitter") as string}>{t("sns.platform.twitter")}</option>
                        <option value={t("sns.platform.youtube") as string}>{t("sns.platform.youtube")}</option>
                    </Select> */}
          <Flex mb="20px">
            <Button
              variant="outline"
              onClick={(e) => setPlatform("instagram")}
              bg={platform === "instagram" ? "cyan.400" : "white"}
              _hover={{ bg: "#7dc5ea" }}
            >
              <Instagram width="20px" height="20px" />
              <Text color={platform === "instagram" ? "white" : "gray.700"}>
                Instagram
              </Text>
            </Button>
            <Button
              variant="outline"
              onClick={(e) => setPlatform("facebook")}
              bg={platform === "facebook" ? "cyan.400" : "white"}
              _hover={{ bg: "#7dc5ea" }}
            >
              <Facebook width="20px" height="20px" />
              <Text color={platform === "facebook" ? "white" : "gray.700"}>
                Facebook
              </Text>
            </Button>
            <Button
              variant="outline"
              onClick={(e) => setPlatform("twitter")}
              bg={platform === "twitter" ? "cyan.400" : "white"}
              _hover={{ bg: "#7dc5ea" }}
            >
              <Twitter width="20px" height="20px" />
              <Text color={platform === "twitter" ? "white" : "gray.700"}>
                Twitter
              </Text>
            </Button>
            <Button
              variant="outline"
              onClick={(e) => setPlatform("linkedin")}
              bg={platform === "linkedin" ? "cyan.400" : "white"}
              _hover={{ bg: "#7dc5ea" }}
            >
              <Linkedin width="20px" height="20px" />
              <Text color={platform === "linkedin" ? "white" : "gray.700"}>
                Linkedin
              </Text>
            </Button>
            {/* <Button variant='outline' onClick={(e) => setPlatform('other')} bg={platform === 'other' ? 'black' : 'white'} _hover={{ bg: 'grey' }}>
                            <Text color={platform === 'other' ? 'white' : 'black'}>その他</Text>
                        </Button> */}
            <Box>
              <Input
                type="text"
                name="platform"
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="その他"
              ></Input>
            </Box>
          </Flex>
          <FormLabel>③{t("sns.newSns.about")}</FormLabel>
          <Input
            mb="20px"
            type="text"
            name="description"
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            placeholder={t("sns.newSns.examples.about") as string}
          />
          <FormLabel>④{t("email.newEmail.tone")}</FormLabel>
          <Select
            placeholder={t("tone.button") as string}
            onChange={(e) => setTone(e.target.value)}
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
          {isGenerating ? (
            <Button
              mt="20px"
              isLoading
              loadingText={t("generating") as string}
            />
          ) : (
            <Button
              mt="20px"
              colorScheme="blue"
              bg="cyan.400"
              _hover={{ bg: "#7dc5ea" }}
              variant="solid"
              type="submit"
            >
              {t("sns.newSns.button")}
            </Button>
          )}
        </FormControl>
      </form>
      <Box maxW="100%" whiteSpace="pre-wrap" pb="200px">
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
