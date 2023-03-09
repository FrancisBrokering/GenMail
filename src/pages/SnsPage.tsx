import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  Select,
  Grid,
  GridItem,
  Flex,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import EditArea from "../components/editor/EditArea";
import SnsPost from "../components/SNS/SnsPost";
import SnsChat from "../components/SNS/SnsChat";
import BeforeGeneratedText from "../components/common/BeforeGeneratedText";
import Navbar from "../components/NavBar/Navbar";
import { ReactComponent as PostSnsIcon } from "../assets/icons/postSnsIcon.svg";
import { ReactComponent as ChatSnsIcon } from "../assets/icons/chatSnsIcon.svg";
import GeneratedText from "../components/common/GeneratedText";

const SnsPage = () => {
  const [generateOption, setGenerateOption] = useState("Post");
  const [inputLanguage, setInputLanguage] = useState("ja");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const [results, setResult] = useState(["", "", ""]);
  const Result_Bg = useColorModeValue("white", "gray.700");
  const { t, i18n } = useTranslation();
  const tabs = [
    {
      option: "Post",
      icon: <PostSnsIcon width="27px" />,
      i18message: t("sns.Post.option"),
    },
    {
      option: "Chat",
      icon: <ChatSnsIcon width="27px" height="27px" />,
      i18message: t("sns.Chat.option"),
    },
  ];

  const SnsPages = ["Post", "Chat"];

  const getSnsPage = (name: string) => {
    if (name === "Post")
      return (
        <SnsPost
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
          setResult={setResult}
        />
      );
    if (name === "Chat") {
      return (
        <SnsChat
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
          setResult={setResult}
        />
      );
    }
  };

  useEffect(() => {
    setResult(["", "", ""]);
  }, [generateOption]);

  const Tab_Bg = useColorModeValue("white", "gray.700");
  const Tab_Color = useColorModeValue("black", "white");
  const TabPanel_Bg = useColorModeValue("white", "gray.700");
  const TabPanel_Border = useColorModeValue("#e2e8f0", "gray.600");

  return (
    <>
      <Box as="header">
        <Navbar
          generateOption={generateOption}
          setGenerateOption={setGenerateOption}
          tabs={tabs}
        />
      </Box>
      <Grid
        templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }}
        position="relative"
      >
        <GridItem
          colSpan={3}
          mt={"70px"}
          maxHeight={"90vh"}
          overflowY={"scroll"}
        >
          <Box margin="20px 20px 10px 20px">
            <Tabs variant="enclosed">
              <Box
                mb={"20px"}
                borderBottom={"1px solid"}
                borderColor="gray.400"
              >
                <Text ml={"10px"} fontWeight="bold" fontSize="19px">
                  {t("sns." + generateOption + ".pageTitle")}
                </Text>
                <Text
                  ml={"10px"}
                  mb={"10px"}
                  mt={"10px"}
                  opacity={0.7}
                  fontSize="16px"
                >
                  {t("sns." + generateOption + ".pageSubtitle")}
                </Text>
              </Box>
              <TabPanels
                bg={TabPanel_Bg}
                border="1px solid"
                borderColor={TabPanel_Border}
                rounded="10px"
              >
                {SnsPages.map((page) => {
                  return (
                    <TabPanel key={page}>{getSnsPage(generateOption)}</TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
        <GridItem
          colSpan={{ base: 0, md: 2 }}
          mt={{ base: "0px", md: "70px" }}
          maxHeight={"90vh"}
          overflowY={{ base: "visible", md: "scroll" }}
        >
          <Box margin={"10px 0px 10px 10px"} pb="70px">
            {results[0] === "" ? (
              <BeforeGeneratedText />
            ) : (
              results.map((r, index) => {
                return (
                  <Box
                    key={index}
                    margin="20px 20px 10px 0px"
                    top={"20px"}
                    bg={Result_Bg}
                    borderRadius={"10px"}
                  >
                    <GeneratedText index={index} result={r} />
                  </Box>
                );
              })
            )}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default SnsPage;
