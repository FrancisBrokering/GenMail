import React, { useEffect } from "react";
import {
  Text,
  Box,
  Image,
  Button,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useTour } from "@reactour/tour";
import  { useTranslation } from "react-i18next";
import GetIcon from "../data/GetIcon";
import GenPlateHome from "../assets/images/GenPlateHome.png";

const LOCAL_STORAGE_KEY = "FIRST_TIME_ENTER";

const TourModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { setIsOpen } = useTour();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedFirsttimeEnter = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedFirsttimeEnter) {
      onOpen();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify("TRUE"));
    } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  const handleTourClick = () => {
    setIsOpen(true);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth={"650px"}>
          <ModalHeader>
            <Flex alignItems={"center"}>
              {GetIcon("GenPlateIcon", "20px", "20px")}
              <Text ml={"5px"} fontWeight={"normal"}>
                GenPlate
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"} fontSize={"30px"}>
              {t("tour.modal.title")}
            </Text>
            <Text mt={"10px"}>
                {t("tour.modal.about")}
            </Text>
            <Text mt={"10px"} mb={"20px"}>
                {t("tour.modal.support")}
            </Text>
            <Box margin={"25px 70px"}>
              <Image src={GenPlateHome} alt="GenPlate" borderRadius={"10px"}></Image>
            </Box>
            <Box mb={"20px"}>
              <input type="checkbox" name="ShowAgain" onChange={handleChange}></input>
              <label htmlFor="ShowAgain"> {t("tour.modal.show")}</label>
            </Box>
          </ModalBody>
        
          <ModalFooter>
            <Flex width={"100%"}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                {t("tour.modal.skip")}
              </Button>
              <Spacer />
              <Button onClick={() => handleTourClick()}>{t("tour.modal.openTour")}</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TourModal;
