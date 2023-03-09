import {
  Box,
  Text,
  FormLabel,
  Divider,
  Button,
  Flex,
  Select,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { ReactComponent as JapanFlag } from "../../assets/icons/Japan.svg";
import { ReactComponent as UsaFlag } from "../../assets/icons/USA.svg";
import { ReactComponent as SpainFlag } from "../../assets/icons/Spain.svg";
import { ReactComponent as FranceFlag } from "../../assets/icons/France.svg";
import { ReactComponent as GermanyFlag } from "../../assets/icons/Germany.svg";
import { ReactComponent as ItalyFlag } from "../../assets/icons/Italy.svg";
import { ReactComponent as StepBlue } from "../../assets/icons/StepBlue.svg";
import InstructionStep from "./InstructionStep";

type LanguageInputOutputProps = {
  pageTitle: string;
  setInputLanguage: (language: string) => void;
  setOutputLanguage: (language: string) => void;
  inputLanguage: string;
  outputLanguage: string;
  className: string;
  page: string;
  currentStep: number;
};

//TODO: when adding more languages, need to change props to have setOutputLanguage() and setInputLanguage(). setLanguage is currently serving no purpose
const LanguageInputOutput = (props: LanguageInputOutputProps) => {
  const { t, i18n } = useTranslation();
  const Menu_Border = useColorModeValue("gray.200", "gray.600");
  const inputLanguageOptions = ["ja", "en"];
  const outputLanguageOptions = ["en", "es", "fr", "de", "it"];

  const getSelectLanguagePrompt = () => {
    switch (props.page) {
      case "New":
        return t("selectLang.email");
      case "Reply":
        return t("selectLang.email");
      case "Post":
        return t("selectLang.sns.post");
      case "Chat":
        return t("selectLang.sns.chat");
      default:
        return t("selectLang.email");
    }
  };

  const getFlag = (language: string) => {
    switch (language) {
      case "ja":
        return <JapanFlag margin-right="12px" width="22px" height="22px" />;
      case "en":
        return <UsaFlag margin-right="12px" width="22px" height="22px" />;
      case "es":
        return <SpainFlag margin-right="12px" width="22px" height="22px" />;
      case "fr":
        return <FranceFlag margin-right="12px" width="22px" height="22px" />;
      case "de":
        return <GermanyFlag margin-right="12px" width="22px" height="22px" />;
      case "it":
        return <ItalyFlag margin-right="12px" width="22px" height="22px" />;
      default:
        return <UsaFlag margin-right="12px" width="22px" height="22px" />;
    }
  };

  const getLanguage = (language: string) => {
    switch (language) {
      case "ja":
        return t("japanese");
      case "en":
        return t("english");
      case "es":
        return t("spanish");
      case "fr":
        return t("french");
      case "de":
        return t("german");
      case "it":
        return t("italian");
      default:
        return t("english");
    }
  };

  return (
    <Box key={Math.floor(Math.random() * 10000)}>
      <InstructionStep
        instructionPrompt={getSelectLanguagePrompt()}
        stepNumber={1}
        currentStep={props.currentStep}
      />
      <Flex className={props.className}>
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={getFlag(props.inputLanguage)}
            rightIcon={<ChevronDownIcon />}
            variant="outline"
            borderColor={Menu_Border}
          >
            <Text fontWeight="500">{getLanguage(props.inputLanguage)}</Text>
          </MenuButton>
          <MenuList zIndex={3}>
            {inputLanguageOptions.map((lang, index) => {
              return (
                <>
                  <MenuItem
                    key={Math.floor(Math.random() * 10000)}
                    minH="48px"
                    onClick={(e) => {
                      props.setInputLanguage(lang);
                    }}
                    icon={getFlag(lang)}
                  >
                    <Text>{getLanguage(lang)}</Text>
                  </MenuItem>
                </>
              );
            })}
          </MenuList>
        </Menu>

        <Center pl="20px" pr="20px">
          <ArrowRightIcon w={6} h={6} color="#0768d2" />
        </Center>
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={getFlag(props.outputLanguage)}
            rightIcon={<ChevronDownIcon />}
            variant="outline"
            borderColor={Menu_Border}
          >
            <Text fontWeight="500">{getLanguage(props.outputLanguage)}</Text>
          </MenuButton>
          <MenuList>
            {outputLanguageOptions.map((lang, index) => {
              return (
                <MenuItem
                  key={Math.floor(Math.random() * 10000)}
                  minH="48px"
                  onClick={(e) => {
                    props.setOutputLanguage(lang);
                  }}
                  icon={getFlag(lang)}
                >
                  <Text>{getLanguage(lang)}</Text>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default LanguageInputOutput;
