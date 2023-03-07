import React from "react";
import {
  Box,
  Text,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type NavbarProps = {
  tabs: { option: string; icon: JSX.Element; i18message: string }[];
  generateOption: string;
  setGenerateOption: (lang: string) => void;
};

export const Navbar = (props: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const navbar_bg = useColorModeValue("white", "gray.700");
  const selectedTabButton_bg = useColorModeValue("blue.100", "blue.100");
  const tabButton_hover = useColorModeValue("blue.100", "blue.100");
  const SelectedTab_Color = useColorModeValue("#0768d2", "#0768d2");
  const Tab_Color = useColorModeValue("gray.600", "gray.400");

  //   const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box as="section">
      <Box
        as="nav"
        bg={navbar_bg}
        position={"fixed"}
        width={"100%"}
        zIndex={10}
        boxShadow="sm"
      >
        <Container py={{ base: "3", lg: "3" }} margin="0px">
          <HStack spacing="10">
            <Flex>
              <ButtonGroup>
                {props.tabs.map((tab, index) => {
                  return (
                    <Button
                      key={index}
                      _hover={{ bg: tabButton_hover }}
                      bg={
                        tab.option === props.generateOption
                          ? selectedTabButton_bg
                          : "transparent"
                      }
                      onClick={() => props.setGenerateOption(tab.option)}
                    >
                      <Flex alignItems="center">
                        {tab.icon}
                        <Text
                          ml={{ base: "0px", md: "5px" }}
                          color={
                            props.generateOption === tab.option
                              ? SelectedTab_Color
                              : Tab_Color
                          }
                        >
                          {tab.i18message}
                        </Text>
                      </Flex>
                    </Button>
                  );
                })}
              </ButtonGroup>
            </Flex>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
