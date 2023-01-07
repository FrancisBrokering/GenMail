import React, { useState } from "react";
import NewEmail from "../components/Email/NewEmail";
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
} from "@chakra-ui/react";
import ReplyEmail from "../components/Email/ReplyEmail";
import ReviewEmail from "../components/Email/ReviewEmail";
import EditEmail from "../components/Email/EditEmail";
import { useTranslation } from "react-i18next";
import EditArea from "../components/EditArea";
import LanguageInputOutput from "../components/common/LanguageInputOutput";


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

  return (
    <Grid templateColumns={"repeat(5, 1fr)"}>
      <GridItem colSpan={3}>
        <Box margin="20px 20px 0px 20px">
          <Tabs variant="enclosed">
            <TabList>
              {tabs.map((tab) => {
                return (
                  <Tab 
                    key={tab.option}
                    bg={generateOption === tab.option ? "white" : "transparent"}
                    onClick={() => setGenerateOption(tab.option)}
                  >
                    <Text color={generateOption === tab.option ? "black" : "gray.600"}>
                      {tab.emoji} {tab.i18message}
                    </Text>
                  </Tab>
                )
              })}
            </TabList>
            <TabPanels bg="white">
              <TabPanel border="1px solid" borderColor="#e2e8f0">
                <LanguageInputOutput
                  pageTitle={t("email.newEmail.pageTitle") as string}
                  setLanguage={setLanguage}
                />
                <NewEmail lang={language} />
              </TabPanel>
              <TabPanel border="1px solid" borderColor="#e2e8f0">
                <LanguageInputOutput
                  pageTitle={t("email.replyEmail.pageTitle") as string}
                  setLanguage={setLanguage}
                />
                <ReplyEmail lang={language} />
              </TabPanel>
              <TabPanel border="1px solid" borderColor="#e2e8f0">
                <LanguageInputOutput
                  pageTitle={t("email.editEmail.pageTitle") as string}
                  setLanguage={setLanguage}
                />
                <EditEmail lang={language} />
              </TabPanel>
              <TabPanel border="1px solid" borderColor="#e2e8f0">
                <LanguageInputOutput
                  pageTitle={t("email.reviewEmail.pageTitle") as string}
                  setLanguage={setLanguage}
                />
                <ReviewEmail lang={language} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <EditArea></EditArea>
      </GridItem>
    </Grid>
  );
};

export default EmailPage;
