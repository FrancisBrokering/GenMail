import {
  Box,
  Text,
  useClipboard,
  Divider,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";

type GeneratedTextProps = {
  result: string;
  index: number;
};

const GeneratedText = (props: GeneratedTextProps) => {
  const { t } = useTranslation();
  const { onCopy, setValue, hasCopied } = useClipboard("");

  useEffect(() => {
    setValue(props.result);
  }, []);

  return (
    <>
      <Divider mt="10px" orientation="horizontal" />
      <Flex direction="column" mt="40px">
        <Flex justifyContent={"space-between"} mb="5px">
          <Text fontWeight="bold">
            {" "}
            {t("email.option")} {props.index + 1}
          </Text>
          <Button
            colorScheme="blue"
            bg="cyan.400"
            _hover={{ bg: "#7dc5ea" }}
            variant="solid"
            w="90px"
            onClick={onCopy}
          >
            {hasCopied ? t("copied") : t("copy")}
          </Button>
        </Flex>
        <Box rounded="5px" _hover={{ bg: "gray.100" }} key={props.index}>
          <Text margin="5px 5px 5px 5px">
            {props.result.replace(/^\s+|\s+$/g, "")}
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default GeneratedText;
