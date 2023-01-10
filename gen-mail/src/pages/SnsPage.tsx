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

  const Tab_Bg = useColorModeValue("white", "gray.700")
  const Tab_Color = useColorModeValue("black", "white")
  const TabPanel_Bg = useColorModeValue("white", "gray.700")
  const TabPanel_Border = useColorModeValue("#e2e8f0", "gray.600")

  return (
    <Grid templateColumns={"repeat(5, 1fr)"}>
      <GridItem colSpan={3}>
        <Box margin="10px 20px 10px 20px">
          <Tabs variant="enclosed">
            <TabList>
              <Tab
                height={"46px"}
                bg={generateOption === "New" ? Tab_Bg : "transparent"}
                onClick={() => setGenerateOption("New")}
              >
                <Text color={generateOption === "New" ? Tab_Color : "gray.600"}>
                  📝 {t("sns.newSns.option")}
                </Text>
              </Tab>
              {/* <Tab onClick={(e) => setGenerateOption('Review')}>
                                <Text color={generateOption === 'Review' ? 'black' : 'grey'}>📝 {t("sns.reviewSns.option")}</Text>
                            </Tab> */}
            </TabList>
            <TabPanels bg={TabPanel_Bg}>
              <TabPanel border="1px solid" borderColor={TabPanel_Border}>
                <NewSns lang={language} setLanguage={setLanguage} />
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
        <Box margin="10px 20px 10px 0px">
          <EditArea></EditArea>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default SnsPage;
