import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { StepType } from "@reactour/tour";

export const steps: StepType[] = [
  {
    selector: ".first-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return (
        <Box width="300px">
          <Text color={"black"}>{t("tour.firstStep")}</Text>
          {/* <Text>
            Ex: Input Language -{">"} Japanese
                Output Language -{">"} English
          </Text>
          <Text>The above will generate English templates.</Text> */}
        </Box>
      );
    },
  },
  {
    selector: ".second-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return (
        <Box width="300px">
          <Text color={"black"}>{t("tour.secondStep")}</Text>
        </Box>
      );
    },
  },
  {
    selector: ".third-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return (
        <Box width="300px">
          <Text color={"black"}>{t("tour.thirdStep")}</Text>
        </Box>
      );
    },
  },
  {
    selector: ".fourth-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return (
        <Box width="300px">
          <Text color={"black"}>{t("tour.fourthStep")}</Text>
        </Box>
      );
    },
  },
  {
    selector: ".fifth-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return (
        <Box width="300px">
          <Text color={"black"}>{t("tour.fifthStep")}</Text>
        </Box>
      );
    },
  },
  {
    selector: ".sixth-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return (
        <Box width="300px">
          <Text color={"black"}>{t("tour.sixthStep")}</Text>
        </Box>
      );
    },
    position: "right",
    // position: "center",
  },
];
