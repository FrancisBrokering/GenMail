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
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import EditArea from "../components/EditArea";
import NewSns from "../components/SNS/NewSns";
import LanguageInputOutput from "../components/common/LanguageInputOutput";

const SnsPage = () => {
  const [generateOption, setGenerateOption] = useState("New");
  const [language, setLanguage] = useState("ja");
  const { t, i18n } = useTranslation();

  function GenerateOptionTitle() {
    switch (generateOption) {
      case "New":
        return t("sns.newSns.pageTitle");
      case "Review":
        return t("sns.newSns.pageTitle");
      default:
        return t("sns.newSns.pageTitle");
    }
  }

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
                  {t("sns.newSns.option")}
                </Text>
              </Tab>
              {/* <Tab onClick={(e) => setGenerateOption('Review')}>
                                <Text color={generateOption === 'Review' ? 'black' : 'grey'}>📝 {t("sns.reviewSns.option")}</Text>
                            </Tab> */}
            </TabList>
            <TabPanels bg="white">
              <TabPanel border="1px solid" borderColor="#e2e8f0">
                <LanguageInputOutput
                  pageTitle={GenerateOptionTitle()}
                  setLanguage={setLanguage}
                />
                <NewSns lang={language} />
              </TabPanel>
              {/* <TabPanel border='1px solid' borderColor='#e2e8f0'>
                                <LanguageInputOutput pageTitle={GenerateOptionTitle()} setLanguage={setLanguage} />
                                <ReviewEmail lang={language} />
                            </TabPanel> */}
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

export default SnsPage;
