import React, { useState } from "react";
import {
  Box,
  Select,
  Grid,
  GridItem,
  Text,
  Flex,
  Center,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useColorModeValue,
} from "@chakra-ui/react";
import NewEmail from "../components/Email/NewEmail";
import ReplyEmail from "../components/Email/ReplyEmail";
import ReviewEmail from "../components/Email/ReviewEmail";
import EditEmail from "../components/Email/EditEmail";
import { useTranslation } from "react-i18next";
import EditArea from "../components/EditArea";

const EmailPages = ["New", "Reply", "Edit", "Review"];

const EmailPage = () => {
  const [generateOption, setGenerateOption] = useState("New");
  const [inputLanguage, setInputLanguage] = useState("ja");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const { t, i18n } = useTranslation();
  const tabs = [
    { option: "New", emoji: "✉️", i18message: t("email.newEmail.option") },
    { option: "Reply", emoji: "📩", i18message: t("email.replyEmail.option") },
    { option: "Edit", emoji: "📧", i18message: t("email.editEmail.option") },
    {
      option: "Review",
      emoji: "📨",
      i18message: t("email.reviewEmail.option"),
    },
  ];

  const Tab_Bg = useColorModeValue("white", "gray.700");
  const SelectedTab_Color = useColorModeValue("black", "white");
  const Tab_Color = useColorModeValue("gray.600", "gray.400");
  const TabPanel_Bg = useColorModeValue("white", "gray.700");
  const TabPanel_Border = useColorModeValue("#e2e8f0", "gray.600");

  const getEmailPage = (name: string) => {
    if (name === "New")
      return (
        <NewEmail
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
        />
      );
    if (name === "Reply")
      return (
        <ReplyEmail
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
        />
      );
    if (name === "Edit")
      return (
        <EditEmail
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
        />
      );
    if (name === "Review")
      return (
        <ReviewEmail
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
        />
      );
  };

  return (
    <Grid templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }}>
      <GridItem colSpan={3}>
        <Box margin="10px 20px 10px 20px">
          <Tabs variant="enclosed">
            <TabList borderBottom={"0px"} pb={"1px"}>
              {tabs.map((tab) => {
                return (
                  <Tab
                    height={"47px"}
                    key={tab.option}
                    borderBottom={"0px"}
                    bg={generateOption === tab.option ? Tab_Bg : "transparent"}
                    onClick={() => setGenerateOption(tab.option)}
                  >
                    <Text
                      color={
                        generateOption === tab.option
                          ? SelectedTab_Color
                          : Tab_Color
                      }
                    >
                      {tab.emoji} {tab.i18message}
                    </Text>
                  </Tab>
                );
              })}
            </TabList>
            <TabPanels
              bg={TabPanel_Bg}
              border="1px solid"
              borderColor={TabPanel_Border}
              borderTopLeftRadius={generateOption === "New" ? "0px" : "10px"}
              borderTopRightRadius={"10px"}
              borderBottomRadius={"10px"}
            >
              {EmailPages.map((page) => {
                return <TabPanel key={page}>{getEmailPage(page)}</TabPanel>;
              })}
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
      <GridItem colSpan={{ base: 0, md: 2 }}>
        <Box margin="10px 20px 10px 0px" position={"sticky"} top="10px">
          <EditArea></EditArea>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default EmailPage;
