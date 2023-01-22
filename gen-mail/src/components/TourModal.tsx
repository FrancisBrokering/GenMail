import React, { useEffect } from "react";
import {
  Text,
  Box,
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
import GetIcon from "../data/GetIcon";

const LOCAL_STORAGE_KEY = "FIRST_TIME_ENTER";

const TourModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { setIsOpen } = useTour();

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
        <ModalContent>
          <ModalHeader>
            <Flex alignItems={"center"}>
              {colorMode == "dark"
                ? GetIcon("GenPlateLogoDark", "20px", "20px")
                : GetIcon("GenPlateLogo", "20px", "20px")}
              <Text ml={"5px"} fontWeight={"normal"}>
                GenPlate
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"} fontSize={"30px"}>
              Welcome to GenPlate!
            </Text>
            <Text mt={"10px"}>
              GenPlate stands for Generate Templates.
            </Text>
            <Text mt={"10px"}>
                GenPlate is a revolutionary new app that automatically generates E-mail and SNS message templates in various languages. 
                With GenPlate, you&#39;ll never have to struggle with language barriers again. And the best part? It&#39;s completely free! 
            </Text>
            <Text mt={"10px"} mb={"20px"}>
                We&#39;re still in the process of developing and improving GenPlate, so if you like it, please leave a review to let us 
                know how we&#39;re doing.
            </Text>
            <input type="checkbox" name="ShowAgain" onChange={handleChange}></input>
            <label htmlFor="ShowAgain"> Don&#39;t show this again.</label>
          </ModalBody>
        
          <ModalFooter>
            <Flex width={"100%"}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Skip
              </Button>
              <Spacer />
              <Button onClick={() => handleTourClick()}>Open Tour</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TourModal;
