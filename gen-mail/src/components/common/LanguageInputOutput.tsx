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
//Use this link for flag SVGs https://uxwing.com/usa-flag-round-circle-icon/

type LanguageInputOutputProps = {
  pageTitle: string;
  setLanguage: (language: string) => void;
};

//TODO: when adding more languages, need to change props to have setOutputLanguage() and setInputLanguage(). setLanguage is currently serving no purpose 
const LanguageInputOutput = (props: LanguageInputOutputProps) => {
  const { t, i18n } = useTranslation();
  const [userInputLanguageLocalVer, setUserInputLanguageLocalVer] = useState("ja");
  const [userOutputLanguageLocalVer, setUserOutputLanguageLocalVer] = useState("en");

  const Menu_Border = useColorModeValue("gray.200", "gray.600");

  return (
    <Box>
      <Text textAlign="center" mb="50px" fontWeight="bold" fontSize="20px">
        {props.pageTitle}
      </Text>
      <FormLabel>①{t("selectLang")}</FormLabel>
      <Flex>

      <Menu>
          <MenuButton as={Button}
            leftIcon={userInputLanguageLocalVer === "ja" ? <JapanFlag margin-right='12px' width='22px' height='22px' /> : <UsaFlag margin-right='12px' width='22px' height='22px' />}
            rightIcon={<ChevronDownIcon />}
            variant='outline'
            borderColor={Menu_Border}
          >
            <Text fontWeight='500'>{userInputLanguageLocalVer === "ja" ? t("japanese") : t("english")}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem minH='48px' onClick={(e) => {props.setLanguage("ja");setUserInputLanguageLocalVer("ja")}} icon={<JapanFlag margin-right='12px' width='22px' height='22px' />}>
              <Text >{t("japanese")}</Text>
            </MenuItem>
            <MenuItem minH='40px' onClick={(e) => {props.setLanguage("en");setUserInputLanguageLocalVer("en")}} icon={<UsaFlag margin-right='12px' width='22px' height='22px' />}>
              <Text >{t("english")}</Text>
            </MenuItem>
          </MenuList>
        </Menu>

        <Center pl="20px" pr="20px">
          <ArrowRightIcon w={6} h={6} color="cyan.400" />
        </Center>

        <Menu>
          <MenuButton as={Button}
            leftIcon={userOutputLanguageLocalVer === "ja" ? <JapanFlag margin-right='12px' width='22px' height='22px' /> : <UsaFlag margin-right='12px' width='22px' height='22px' />}
            rightIcon={<ChevronDownIcon />}
            variant='outline'
            borderColor={Menu_Border}
          >
            <Text fontWeight='500'>{userOutputLanguageLocalVer === "ja" ? t("japanese") : t("english")}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem minH='40px' onClick={(e) => {props.setLanguage("en");setUserOutputLanguageLocalVer("en")}} icon={<UsaFlag margin-right='12px' width='22px' height='22px' />}>
              <Text >{t("english")}</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default LanguageInputOutput;
