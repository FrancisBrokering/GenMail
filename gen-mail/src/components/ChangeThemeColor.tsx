import React from 'react';
import { useColorMode, FormControl, FormLabel, Switch, Flex } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";

const ChangeThemeColor = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { t } = useTranslation();

  console.log(colorMode)
  return (
    <FormControl ml={"25px"} mt="20px">
      <Flex>
        <FormLabel>{colorMode === "dark" ? t("lightMode") : t("darkMode")}</FormLabel>
        <Switch
          size={"md"}
          mt="5px"
          defaultChecked={colorMode === "dark" ? true : false}
          onChange={toggleColorMode}
        />
      </Flex>
    </FormControl>
  )
}

export default ChangeThemeColor;