import React from 'react';

// type SidebarContentProps = {
//     onClose: () => void;
//     userLanguage: string;
//     setUserLanguage: (lang: string) => void;
// }
  
//   const SidebarContent = ({
//     onClose,
//     userLanguage,
//     setUserLanguage,
//     ...rest
//   }: SidebarContentProps) => {
//     const { t, i18n } = useTranslation();
  
//     interface LinkItemProps {
//       name: string;
//       link: string;
//       icon: IconType;
//     }
//     const LinkItems: Array<LinkItemProps> = [
//       // { name: t("sidebar.home"), link: "home", icon: FiHome },
//       { name: t("sidebar.email"), link: "email", icon: FiMail },
//       { name: t("sidebar.sns"), link: "sns", icon: FiTwitter },
//     ];
  
//     const Sidebar_Border = useColorModeValue("gray.200", "gray.700");
//     const SelectLang_Border = useColorModeValue("gray.300", "gray.300");
//     const Divider_Color = useColorModeValue("gray.600", "gray.600");
//     const { colorMode } = useColorMode();
  
//     return (
//       <Box
//         borderRight="1px"
//         borderRightColor={Sidebar_Border}
//         w={{ base: "full", md: 60 }}
//         pos="fixed"
//         h="full"
//         {...rest}
//       >
//         <Flex
//           h="20"
//           alignItems="center"
//           mx="8"
//           justifyContent="space-between"
//           mb="30px"
//           mt="40px"
//         >
//           <Image src={GenPlateLogoDarkModePNG} height={{ base: "100%", md: "100px" }} /> 
//           <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} color="gray.100"/>
//         </Flex>
//         <Flex flexDirection={"column"} height="70%">
//           <Box className="fifth-step" color={"gray.100"}>
//             {LinkItems.map((link) => (
//               <NavItem
//                 key={link.name}
//                 link={link.link}
//                 icon={link.icon}
//                 onClick={onClose}
//               >
//                 {link.name}
//               </NavItem>
//             ))}
//           </Box>
//           <Spacer />
//           <Box margin={"20px 15px"}>
//             <Divider borderColor={Divider_Color} />
//           </Box>
//           <Box mt="10px" ml="25px">
//             <Menu>
//               <DarkMode>
//                 <MenuButton
//                   as={Button}
//                   leftIcon={
//                     userLanguage === "ja" ? (
//                       <JapanFlag margin-right="12px" width="22px" height="22px" />
//                     ) : (
//                       <UsaFlag margin-right="12px" width="22px" height="22px" />
//                     )
//                   }
//                   rightIcon={<ChevronDownIcon />}
//                   variant="outline"
//                   borderColor={SelectLang_Border}
//                 >
//                   <Text fontWeight="500">
//                     {userLanguage === "ja" ? t("japanese") : t("english")}
//                   </Text>
//                 </MenuButton>
//               </DarkMode>
//               <MenuList>
//                 <MenuItem
//                   minH="48px"
//                   onClick={() => setUserLanguage("ja")}
//                   icon={
//                     <JapanFlag margin-right="12px" width="22px" height="22px" />
//                   }
//                 >
//                   <Text>{t("japanese")}</Text>
//                 </MenuItem>
//                 <MenuItem
//                   minH="40px"
//                   onClick={() => setUserLanguage("en")}
//                   icon={
//                     <UsaFlag margin-right="12px" width="22px" height="22px" />
//                   }
//                 >
//                   <Text>{t("english")}</Text>
//                 </MenuItem>
//               </MenuList>
//             </Menu>
//             <ChangeThemeColor />
//           </Box>
//         </Flex>
//       </Box>
//     );
//   };
  
//   interface NavItemProps extends FlexProps {
//     icon: IconType;
//     link: string;
//     children: ReactText;
//   }
//   const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
//     const NavItem_Bg = useColorModeValue("cyan.600", "cyan.600");
  
//     return (
//       <Link
//         as={ReactRouterLink}
//         to={link}
//         style={{ textDecoration: "none" }}
//         _focus={{ boxShadow: "none" }}
//       >
//         <Flex
//           align="center"
//           p="4"
//           mx="4"
//           borderRadius="lg"
//           role="group"
//           cursor="pointer"
//           _hover={{
//             bg: NavItem_Bg,
//             color: "white",
//           }}
//           {...rest}
//         >
//           {icon && (
//             <Icon
//               mr="4"
//               fontSize="16"
//               _groupHover={{
//                 color: "white",
//               }}
//               as={icon}
//             />
//           )}
//           {children}
//         </Flex>
//       </Link>
//     );
//   };

// export default SidebarContent;