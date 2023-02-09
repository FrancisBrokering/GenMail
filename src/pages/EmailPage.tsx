import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";

import NewEmail from "../components/Email/NewEmail";
import ReplyEmail from "../components/Email/ReplyEmail";
import EditEmail from "../components/Email/EditEmail";
import EditArea from "../components/editor/EditArea";
import TourModal from "../components/TourModal";
import { ReactComponent as NewEmailIcon } from "../assets/icons/newEmailIcon.svg";
import { ReactComponent as Email2 } from "../assets/icons/Email2.svg";
import { ReactComponent as Email3 } from "../assets/icons/Email3.svg";
import { ReactComponent as ReplyEmailIcon } from "../assets/icons/replyEmailIcon.svg";
import { ReactComponent as EditEmailIcon } from "../assets/icons/editEmailIcon.svg";
import { ReactComponent as Email6 } from "../assets/icons/Email6.svg";

const EmailPages = ["New", "Reply", "Edit"];

const EmailPage = () => {
  const { t, i18n } = useTranslation();
  const [generateOption, setGenerateOption] = useState("New");
  const [inputLanguage, setInputLanguage] = useState("ja");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const Tab_Bg = useColorModeValue("white", "gray.700");
  const SelectedTab_Color = useColorModeValue("black", "white");
  const Tab_Color = useColorModeValue("gray.600", "gray.400");
  const TabPanel_Bg = useColorModeValue("white", "gray.700");
  const TabPanel_Border = useColorModeValue("#e2e8f0", "gray.600");
  const tabs = [
    {
      option: "New",
      icon: <NewEmailIcon width="27px" />,
      i18message: t("email.newEmail.option"),
    },
    {
      option: "Reply",
      icon: <ReplyEmailIcon width="27px" />,
      i18message: t("email.replyEmail.option"),
    },
    {
      option: "Edit",
      icon: <EditEmailIcon width="27px" />,
      i18message: t("email.editEmail.option"),
    },
    // {
    //   option: "Review",
    //   emoji: "📨",
    //   i18message: t("email.reviewEmail.option"),
    // },
  ];

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
  };

  return (
    <>
      <TourModal />
      <Grid templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }}>
        <GridItem colSpan={3}>
          <Box margin="10px 20px 10px 20px">
            <Tabs variant="enclosed">
              <TabList borderBottom={"0px"} pb={"1px"}>
                {tabs.map((tab) => {
                  return (
                    <Tab
                      // height={"47px"}
                      key={tab.option}
                      borderBottom={"0px"}
                      bg={
                        generateOption === tab.option ? Tab_Bg : "transparent"
                      }
                      onClick={() => setGenerateOption(tab.option)}
                    >
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        alignItems="center"
                      >
                        {tab.icon}
                        <Text
                          ml={{ base: "0px", md: "5px" }}
                          color={
                            generateOption === tab.option
                              ? SelectedTab_Color
                              : Tab_Color
                          }
                        >
                          {tab.i18message}
                        </Text>
                      </Flex>
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
    </>
  );
};

export default EmailPage;
