import React from "react";
import {
  useColorMode,
  Flex,
  Button,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactComponent as DarkMoon } from "../assets/icons/DarkMoon.svg";
import { ReactComponent as LightSun } from "../assets/icons/LightSun.svg";

const ChangeThemeColor = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const ThemeButton_Bg = useColorModeValue("gray.700", "gray.700");
  const { t } = useTranslation();

  console.log(colorMode);
  return (
    <Box mt="20px">
      <Button
        bg={"transparent"}
        _hover={{ bg: ThemeButton_Bg }}
        onClick={toggleColorMode}
      >
        <Flex alignItems={"center"} color="gray.100">
          {colorMode === "dark" ? <LightSun /> : <DarkMoon />}
          <Text ml={"10px"}>
            {colorMode === "dark" ? t("lightMode") : t("darkMode")}
          </Text>
        </Flex>
      </Button>
    </Box>
  );
};

export default ChangeThemeColor;
