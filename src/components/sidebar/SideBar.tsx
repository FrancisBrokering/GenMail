import React, { ReactNode, useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spacer,
  Select,
  Center,
  Divider,
  Image,
  DarkMode,
  VStack,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiMail, FiTwitter, FiSend } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as GenPlateLogo } from "../../assets/icons/GenPlateLogo.svg";
import { ReactComponent as GenPlateLogoDarkMode } from "../../assets/icons/GenPlateLogoDarkMode.svg";
import GenPlateLogoPNG from "../../assets/icons/GenPlateLogo.png";
import GenPlateLogoDarkModePNG from "../../assets/icons/GenPlateLogoDarkMode.png";
import GenPlateMobileLogoPNG from "../../assets/icons/GenPlateMobileLogo.png";
import GenPlateMobileLogoDarkModePNG from "../../assets/icons/GenPlateMobileLogoDarkMode.png";
import ChangeThemeColor from "../ChangeThemeColor";
import { ReactComponent as JapanFlag } from "../../assets/icons/Japan.svg";
import { ReactComponent as UsaFlag } from "../../assets/icons/USA.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";

type SidebarProps = {
  children?: JSX.Element | JSX.Element[];
  userLanguage: string;
  setUserLanguage: (lang: string) => void;
};

export default function Sidebar({
  children,
  userLanguage,
  setUserLanguage,
}: SidebarProps) {
  // const [ theme, setTheme ] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Sidebar_Content_Bg = useColorModeValue("gray.900", "gray.900");
  const Sidebar_Body_Bg = useColorModeValue("gray.100", "gray.800");

  return (
    <Box minH="100vh">
      <SidebarContent
        bg={Sidebar_Content_Bg}
        onClose={onClose}
        display={{ base: "none", md: "block" }}
        userLanguage={userLanguage}
        setUserLanguage={setUserLanguage}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent
            bg={Sidebar_Content_Bg}
            onClose={onClose}
            userLanguage={userLanguage}
            setUserLanguage={setUserLanguage}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} minH="100vh" bg={Sidebar_Body_Bg}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  userLanguage: string;
  setUserLanguage: (lang: string) => void;
}

const SidebarContent = ({
  onClose,
  userLanguage,
  setUserLanguage,
  ...rest
}: SidebarContentProps) => {
  const { t, i18n } = useTranslation();

  interface LinkItemProps {
    name: string;
    link: string;
    icon: IconType;
  }
  const LinkItems: Array<LinkItemProps> = [
    { name: t("sidebar.home"), link: "home", icon: FiHome },
    { name: t("sidebar.email"), link: "email", icon: FiMail },
    { name: t("sidebar.sns"), link: "sns", icon: FiTwitter },
  ];

  const Sidebar_Border = useColorModeValue("gray.200", "gray.700");
  const SelectLang_Border = useColorModeValue("gray.300", "gray.300");
  const Divider_Color = useColorModeValue("gray.600", "gray.600");
  const ThemeButton_Bg = useColorModeValue("gray.700", "gray.700");
  const { colorMode } = useColorMode();

  return (
    <Box
      // borderRight="1px"
      borderRightColor={Sidebar_Border}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        mb="30px"
        mt="40px"
      >
        <Image
          src={GenPlateLogoDarkModePNG}
          height={{ base: "100%", md: "100px" }}
        />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          color="gray.100"
        />
      </Flex>
      <Flex flexDirection={"column"} height="70%">
        <Box className="fifth-step" color={"gray.100"}>
          {LinkItems.map((link) => (
            <NavItem
              key={link.name}
              link={link.link}
              icon={link.icon}
              onClick={onClose}
            >
              {link.name}
            </NavItem>
          ))}
        </Box>
        <Spacer />
        <Box margin={"20px 15px"}>
          <Divider borderColor={Divider_Color} />
        </Box>
        <Flex mt="10px" ml="25px">
          <VStack alignItems="left" spacing={4}>
            <Menu>
              <DarkMode>
                <MenuButton
                  as={Button}
                  leftIcon={
                    userLanguage === "ja" ? (
                      <JapanFlag
                        margin-right="12px"
                        width="22px"
                        height="22px"
                      />
                    ) : (
                      <UsaFlag margin-right="12px" width="22px" height="22px" />
                    )
                  }
                  rightIcon={<ChevronDownIcon />}
                  variant="outline"
                  borderColor={SelectLang_Border}
                  ml="10px"
                >
                  <Text fontWeight="500">
                    {userLanguage === "ja" ? t("japanese") : t("english")}
                  </Text>
                </MenuButton>
              </DarkMode>
              <MenuList>
                <MenuItem
                  minH="48px"
                  onClick={() => setUserLanguage("ja")}
                  icon={
                    <JapanFlag margin-right="12px" width="22px" height="22px" />
                  }
                >
                  <Text>{t("japanese")}</Text>
                </MenuItem>
                <MenuItem
                  minH="40px"
                  onClick={() => setUserLanguage("en")}
                  icon={
                    <UsaFlag margin-right="12px" width="22px" height="22px" />
                  }
                >
                  <Text>{t("english")}</Text>
                </MenuItem>
              </MenuList>
            </Menu>
            <ChangeThemeColor />
            <Link href="https://forms.gle/zb6QWC1ggvmSLKej7" target="_blank">
              <Button bg={"transparent"} _hover={{ bg: ThemeButton_Bg }}>
                <Flex alignItems={"center"} color="gray.100">
                  <FiSend />
                  <Text ml={"10px"}>{t("contact")}</Text>
                </Flex>
              </Button>
            </Link>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: ReactText;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const NavItem_Bg = useColorModeValue("cyan.600", "cyan.600");

  return (
    <Link
      as={ReactRouterLink}
      to={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: NavItem_Bg,
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="60px"
      alignItems="center"
      bg={useColorModeValue("gray.800", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-between"
      {...rest}
    >
      <Box height="40px">
        <Image src={GenPlateMobileLogoDarkModePNG} height="100%" />
      </Box>
      <DarkMode>
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
        />
      </DarkMode>
    </Flex>
  );
};
