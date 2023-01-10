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
import LanguageInputOutput from "../components/common/LanguageInputOutput";

const EmailPages = ["New", "Reply", "Edit", "Review"]


const EmailPage = () => {
  const [generateOption, setGenerateOption] = useState("New");
  const [language, setLanguage] = useState("ja");
  const { t, i18n } = useTranslation();
  const tabs = [
    { option: "New", emoji: "✉️", i18message: t("email.newEmail.option") },
    { option: "Reply", emoji: "📩", i18message: t("email.replyEmail.option") },
    { option: "Edit", emoji: "📧", i18message: t("email.editEmail.option") },
    { option: "Review", emoji: "📨", i18message: t("email.reviewEmail.option") },
  ]

  const Tab_Bg = useColorModeValue("white", "gray.700")
  const Tab_Color = useColorModeValue("black", "white")
  const TabPanel_Bg = useColorModeValue("white", "gray.700")
  const TabPanel_Border = useColorModeValue("#e2e8f0", "gray.600")

  const getEmailPage = (name: string) => {
    if (name === "New") return (<NewEmail lang={language} setLanguage={setLanguage} />)
    if (name === "Reply") return (<ReplyEmail lang={language} setLanguage={setLanguage} />)
    if (name === "Edit") return (<EditEmail lang={language} setLanguage={setLanguage} />)
    if (name === "Review") return (<ReviewEmail lang={language} setLanguage={setLanguage} />)
  }

  return (
    <Grid templateColumns={"repeat(5, 1fr)"}>
      <GridItem colSpan={3}>
        <Box margin="10px 20px 10px 20px">
          <Tabs variant="enclosed">
            <TabList>
              {tabs.map((tab) => {
                return (
                  <Tab
                    height={"46px"}
                    key={tab.option}
                    bg={generateOption === tab.option ? Tab_Bg : "transparent"}
                    onClick={() => setGenerateOption(tab.option)}
                  >
                    <Text color={generateOption === tab.option ? Tab_Color : "gray.600"}>
                      {tab.emoji} {tab.i18message}
                    </Text>
                  </Tab>
                )
              })}
            </TabList>
            <TabPanels bg={TabPanel_Bg}>
              {EmailPages.map((page) => {
                return (
                  <TabPanel
                    key={page}
                    border="1px solid" 
                    // borderRight="0px" 
                    borderColor={TabPanel_Border} 
                    // minHeight="95vh"
                  >
                    {getEmailPage(page)}
                  </TabPanel>
                )
              })}
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Box margin="10px 20px 10px 0px">
          <EditArea></EditArea>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default EmailPage;
