import React from "react";
import { Box, TagLeftIcon, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const steps = [
  {
    selector: ".first-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return <Text color={"black"}>{t("tour.firstStep")}</Text>;
    },
  },
  {
    selector: ".second-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return <Text color={"black"}>{t("tour.secondStep")}</Text>;
    },
  },
  {
    selector: ".third-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return <Text color={"black"}>{t("tour.thirdStep")}</Text>;
    },
  },
  {
    selector: ".fourth-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return <Text color={"black"}>{t("tour.fourthStep")}</Text>;
    },
  },
  {
    selector: ".fifth-step",
    content: () => {
      const { t, i18n } = useTranslation();
      return <Text color={"black"}>{t("tour.fifthStep")}</Text>;
    },
  },
];
