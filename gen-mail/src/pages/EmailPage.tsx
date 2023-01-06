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
  return (
    <Grid templateColumns={"repeat(5, 1fr)"}>
      <GridItem colSpan={3}>
        <Box margin="20px 20px 0px 20px">
          <Tabs variant="enclosed">
            <TabList>
              <Tab
                bg={generateOption === "New" ? "white" : "transparent"}
                onClick={(e) => setGenerateOption("New")}
              >
                <Text color={generateOption === "New" ? "black" : "gray.600"}>
                  ✉️ {t("email.newEmail.option")}
                </Text>
              </Tab>
              <Tab
                bg={generateOption === "Reply" ? "white" : "transparent"}
                onClick={(e) => setGenerateOption("Reply")}
              >
                <Text color={generateOption === "Reply" ? "black" : "gray.600"}>
                  📩 {t("email.replyEmail.option")}
                </Text>
              </Tab>
              <Tab
                bg={generateOption === "Edit" ? "white" : "transparent"}
                onClick={(e) => setGenerateOption("Edit")}
              >
                <Text color={generateOption === "Edit" ? "black" : "gray.600"}>
                  📧 {t("email.editEmail.option")}
                </Text>
              </Tab>
              <Tab
                bg={generateOption === "Review" ? "white" : "transparent"}
                onClick={(e) => setGenerateOption("Review")}
              >
                <Text
                  color={generateOption === "Review" ? "black" : "gray.600"}
                >
                  📨 {t("email.reviewEmail.option")}
                </Text>
              </Tab>
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
