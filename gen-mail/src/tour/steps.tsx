import React from "react";
import { Box, Text, } from "@chakra-ui/react";
// import { useTranslation } from "react-i18next";

// const { t, i18n } = useTranslation();

export const steps = [
  {
    selector: ".first-step",
    content: () => {
      <Text>
        Select Output Language.
      </Text>
    },
  },
  {
    selector: ".second-step",
    content: () => {
      <Text>
        This is the second step.
      </Text>
    }, 
  },
  {
    selector: ".third-step",
    content: () => {
      <Text>
        This is the third step.
      </Text>
    }, 
  },
  {
    selector: ".fourth-step",
    content: () => {
      <Text>
        This is the fourth step.
      </Text>
    }, 
  },
];
