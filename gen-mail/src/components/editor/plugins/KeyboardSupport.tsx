import React from "react";
import styled from "@emotion/styled";
import { Text, Flex, Kbd, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function getOS() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

const KeyboardSupportPlugin = () => {
  const text_color = useColorModeValue("gray.500", "gray.200");
  const { t } = useTranslation();

  const keyboardOption = () => {
    const OS = getOS();

    if (OS === "Mac OS")
      return (
        <>
          <Kbd>Cmd</Kbd>+<Kbd>Shift</Kbd>+<Kbd>V</Kbd>
        </>
      );
    if (OS === "iOS") return <></>;
    if (OS === "Windows")
      return (
        <>
          <Kbd>Cmd</Kbd>+<Kbd>Shift</Kbd>+<Kbd>V</Kbd>
        </>
      );
    if (OS === "Android") return <></>;
    if (OS === "Linux") return <></>;
  };

  return (
    <StyledDiv>
      <Text color={text_color} paddingRight="3px">
        {t("editor.plainText")}:
      </Text>
      {keyboardOption()}
    </StyledDiv>
  );
};

const StyledDiv = styled("div")`
  display: flex;
  position: absolute;
  text-align: left;
  padding: 5px 3px;
  margin-left: 5px;
  bottom: 0;
`;

export default KeyboardSupportPlugin;
