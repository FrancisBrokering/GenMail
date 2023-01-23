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
import EditArea from "../components/EditArea";
import SnsPost from "../components/SNS/SnsPost";
import SnsChat from "../components/SNS/SnsChat";

const SnsPage = () => {
  const [generateOption, setGenerateOption] = useState("Post");
  const [inputLanguage, setInputLanguage] = useState("ja");
  const [outputLanguage, setOutputLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  const SnsPages = ["Post", "Chat"];

  const getSnsPage = (name: string) => {
    if (name === "Post")
      return (
        <SnsPost
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
        />
      );
    if (name === "Chat") {
      return (
        <SnsChat
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
        />
      );
    }
  };

  const Tab_Bg = useColorModeValue("white", "gray.700");
  const Tab_Color = useColorModeValue("black", "white");
  const TabPanel_Bg = useColorModeValue("white", "gray.700");
  const TabPanel_Border = useColorModeValue("#e2e8f0", "gray.600");

  return (
    <>
      <Grid templateColumns={{ base: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }}>
        <GridItem colSpan={3}>
          <Box margin="10px 20px 10px 20px">
            <Tabs variant="enclosed">
              <TabList borderBottom={"0px"} pb={"1px"}>
                <Tab
                  height={"46px"}
                  borderBottom={"0px"}
                  bg={generateOption === "Post" ? Tab_Bg : "transparent"}
                  onClick={() => setGenerateOption("Post")}
                >
                  <Text color={generateOption === "Post" ? Tab_Color : "gray.600"}>
                    📝 {t("sns.SnsPost.option")}
                  </Text>
                </Tab>
                <Tab
                  height={"46px"}
                  borderBottom={"0px"}
                  bg={generateOption === "Chat" ? Tab_Bg : "transparent"}
                  onClick={() => setGenerateOption("Chat")}
                >
                  <Text color={generateOption === 'Chat' ? Tab_Color : 'gray.600'}>
                    💬 {t("sns.SnsChat.option")}
                  </Text>
                </Tab>
              </TabList>
              <TabPanels
                bg={TabPanel_Bg}
                border="1px solid"
                borderColor={TabPanel_Border}
                borderTopLeftRadius={generateOption === "Post" ? "0px" : "10px"}
                borderTopRightRadius={"10px"}
                borderBottomRadius={"10px"}
              >
                <Text
                  color={generateOption === "Post" ? Tab_Color : "gray.600"}
                >
                  📝 {t("sns.SnsPost.option")}
                </Text>
              </Tab>
              <Tab
                height={"46px"}
                borderBottom={"0px"}
                bg={generateOption === "Chat" ? Tab_Bg : "transparent"}
                onClick={() => setGenerateOption("Chat")}
              >
                <Text
                  color={generateOption === "Chat" ? Tab_Color : "gray.600"}
                >
                  💬 {t("sns.SnsChat.option")}
                </Text>
              </Tab>
            </TabList>
            <TabPanels
              bg={TabPanel_Bg}
              border="1px solid"
              borderColor={TabPanel_Border}
              borderTopLeftRadius={generateOption === "Post" ? "0px" : "10px"}
              borderTopRightRadius={"10px"}
              borderBottomRadius={"10px"}
            >
              {SnsPages.map((page) => {
                return <TabPanel key={page}>{getSnsPage(page)}</TabPanel>;
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

export default SnsPage;
