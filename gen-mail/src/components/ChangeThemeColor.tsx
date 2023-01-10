import React from 'react';
import { useColorMode, FormControl, FormLabel, Switch, Flex, Button, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { ReactComponent as DarkMoon } from "../assets/icons/DarkMoon.svg";
import { ReactComponent as LightSun } from "../assets/icons/LightSun.svg";

const ChangeThemeColor = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const ThemeButton_Bg = useColorModeValue("gray.300", "gray.700")
  const { t } = useTranslation();

  console.log(colorMode)
  return (
    <Box mt="20px">
      <Button
        bg={"transparent"}
        _hover={{ bg: ThemeButton_Bg}}
        onClick={toggleColorMode}
      >
        <Flex alignItems={"center"}>
          {colorMode === "dark" ? <LightSun /> : <DarkMoon />}
          <Text ml={"10px"}>{colorMode === "dark" ? t("lightMode") : t("darkMode")}</Text>
        </Flex>
      </Button>
      {/* <Flex>
        <FormLabel>{colorMode === "dark" ? t("lightMode") : t("darkMode")}</FormLabel>
        <Switch
          size={"md"}
          mt="5px"
          defaultChecked={colorMode === "dark" ? true : false}
          onChange={toggleColorMode}
        />
      </Flex> */}
    </Box>
  )
}

export default ChangeThemeColor;