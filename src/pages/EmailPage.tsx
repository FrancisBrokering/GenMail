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
  Divider,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import NewEmail from "../components/Email/NewEmail";
import ReplyEmail from "../components/Email/ReplyEmail";
import EditEmail from "../components/Email/EditEmail";
import EditArea from "../components/editor/EditArea";
import TourModal from "../components/TourModal";
import Navbar from "../components/NavBar/Navbar";
import GeneratedText from "../components/common/GeneratedText";
import BeforeGeneratedText from "../components/common/BeforeGeneratedText";
import { FiMenu } from "react-icons/fi";
import { ReactComponent as NewEmailIcon } from "../assets/icons/newEmailIcon.svg";
import { ReactComponent as ReplyEmailIcon } from "../assets/icons/replyEmailIcon.svg";
import { ReactComponent as EditEmailIcon } from "../assets/icons/editEmailIcon.svg";

const EmailPages = ["New", "Reply", "Edit"];

const EmailPage = () => {
  const { t, i18n } = useTranslation();
  const [generateOption, setGenerateOption] = useState("New");
  const [inputLanguage, setInputLanguage] = useState("ja");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const [results, setResult] = useState(["", "", ""]);
  const TabPanel_Bg = useColorModeValue("white", "gray.700");
  const TabPanel_Border = useColorModeValue("#e2e8f0", "gray.600");
  const Result_Bg = useColorModeValue("white", "gray.700");
  const tabs = [
    {
      option: "New",
      icon: <NewEmailIcon width="27px" />,
      i18message: t("email.New.option"),
    },
    {
      option: "Reply",
      icon: <ReplyEmailIcon width="27px" />,
      i18message: t("email.Reply.option"),
    },
    {
      option: "Edit",
      icon: <EditEmailIcon width="27px" />,
      i18message: t("email.Edit.option"),
    },
  ];

  const getEmailPage = (name: string) => {
    if (name === "New")
      return (
        <NewEmail
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
          setResult={setResult}
        />
      );
    if (name === "Reply")
      return (
        <ReplyEmail
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
          setResult={setResult}
        />
      );
    if (name === "Edit")
      return (
        <EditEmail
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
          setResult={setResult}
        />
      );
  };

  useEffect(() => {
    setResult(["", "", ""]);
  }, [generateOption]);

  return (
    <>
      <TourModal />
      <Box as="header">
        <Navbar
          generateOption={generateOption}
          setGenerateOption={setGenerateOption}
          tabs={tabs}
        />
      </Box>
      <Grid
        templateColumns={{ base: "repeat(1, 2fr)", md: "repeat(5, 1fr)" }}
        position="relative"
      >
        <GridItem
          colSpan={{ base: 1, md: 3 }}
          mt={"70px"}
          maxHeight={"90vh"}
          overflowY={"scroll"}
        >
          <Box
            margin="20px 20px 10px 20px"
            pb={{ base: "0px", md: "70px" }}
            position={"sticky"}
            top="20px"
          >
            <Tabs variant="enclosed">
              <Box
                mb={"20px"}
                borderBottom={"1px solid"}
                borderColor="gray.400"
              >
                <Text ml={"10px"} fontWeight="bold" fontSize="19px">
                  {t("email." + generateOption + ".pageTitle")}
                </Text>
                <Text
                  ml={"10px"}
                  mb={"10px"}
                  mt={"10px"}
                  opacity={0.7}
                  fontSize="16px"
                >
                  {t("email." + generateOption + ".pageSubtitle")}
                </Text>
              </Box>
              <TabPanels
                bg={TabPanel_Bg}
                mt={"20px"}
                border="1px solid"
                borderColor={TabPanel_Border}
                borderRadius={"10px"}
              >
                {EmailPages.map((page) => {
                  return (
                    <TabPanel key={page}>
                      {getEmailPage(generateOption)}
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
        <GridItem
          colSpan={{ base: 1, md: 2 }}
          mt={{ base: "0px", md: "70px" }}
          maxHeight={"90vh"}
          overflowY={{ base: "visible", md: "scroll" }}
        >
          <Box>
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

export default EmailPage;
