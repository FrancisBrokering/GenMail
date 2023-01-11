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
//Use this link for flag SVGs https://uxwing.com/usa-flag-round-circle-icon/

type LanguageInputOutputProps = {
  pageTitle: string;
  setInputLanguage: (language: string) => void;
  setOutputLanguage: (language: string) => void;
  inputLanguage: string;
  outputLanguage: string;
};

//TODO: when adding more languages, need to change props to have setOutputLanguage() and setInputLanguage(). setLanguage is currently serving no purpose
const LanguageInputOutput = (props: LanguageInputOutputProps) => {
  const { t, i18n } = useTranslation();
  const Menu_Border = useColorModeValue("gray.200", "gray.600");
  const inputLanguageOptions = ["ja", "en"];
  const outputLanguageOptions = ["ja", "en", "es", "fr", "de", "it"];

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
    <Box>
      <Text textAlign="center" mb="50px" fontWeight="bold" fontSize="20px">
        {props.pageTitle}
      </Text>
      <FormLabel>①{t("selectLang")}</FormLabel>
      <Flex>
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
          <MenuList>
            {inputLanguageOptions.map((lang, index) => {
              return (
                <>
                  <MenuItem
                    key={index}
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
          <ArrowRightIcon w={6} h={6} color="cyan.400" />
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
          {/* <MenuList>
            <MenuItem
              minH="40px"
              onClick={(e) => {
                props.setOutputLanguage("en")
              }}
              icon={<UsaFlag margin-right="12px" width="22px" height="22px" />}
            >
              <Text>{t("english")}</Text>
            </MenuItem>
          </MenuList> */}
          <MenuList>
            {outputLanguageOptions.map((lang, index) => {
              return (
                <>
                  <MenuItem
                    key={index}
                    minH="48px"
                    onClick={(e) => {
                      props.setOutputLanguage(lang);
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
      </Flex>
    </Box>
  );
};

export default LanguageInputOutput;
