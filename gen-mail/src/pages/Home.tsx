import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Sidebar from "../components/SideBar";
import NewEmail from "../components/Email/NewEmail";
import {
  Box,
  Center,
  Select,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import ReplyEmail from "../components/Email/ReplyEmail";
import ReviewEmail from "../components/Email/ReviewEmail";
import EditEmail from "../components/Email/EditEmail";
import { useTranslation } from "react-i18next";
import EditArea from "../components/EditArea";

const Home = () => {
  const [generateOption, setGenerateOption] = useState("New");
  const [language, setLanguage] = useState("ja");
  const { t, i18n } = useTranslation();
  const [isLargerThan1025] = useMediaQuery("(min-width: 1025px)");

  function GenerateOption() {
    switch (generateOption) {
      case "New":
        return <NewEmail lang={language} />;
      case "Reply":
        return <ReplyEmail lang={language} />;
      case "Edit":
        return <EditEmail lang={language} />;
      case "Review":
        return <ReviewEmail lang={language} />;
      default:
        return <NewEmail lang={language} />;
    }
  }

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <StyledHome>
        <Grid templateColumns={"repeat(5, 1fr)"}>
          <GridItem colSpan={isLargerThan1025 ? 3 : 5}>
            <Box margin="100px 20px 0px 20px">
              <Select
                mb="15px"
                onChange={(e) => setLanguage(e.target.value)}
                w="300px"
              >
                <option value="ja">JP 🇯🇵</option>
                <option value="en">EN 🇺🇸</option>
              </Select>
              <Select
                mb="15px"
                onChange={(e) => setGenerateOption(e.target.value)}
                w="300px"
              >
                <option value="New">✉️ {t("email.newEmail.option")}</option>
                <option value="Reply">📩 {t("email.replyEmail.option")}</option>
                <option value="Edit">📧 {t("email.editEmail.option")}</option>
                <option value="Review">
                  📨 {t("email.reviewEmail.option")}
                </option>
              </Select>
              {GenerateOption()}
            </Box>
          </GridItem>
          <GridItem colSpan={isLargerThan1025 ? 2 : 0}>
            <EditArea></EditArea>
          </GridItem>
        </Grid>
      </StyledHome>
    </>
  );
};

const StyledHome = styled("div")`
  width: 100%;
  height: 100vh;
  position: relative;

  .center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
`;

export default Home;
