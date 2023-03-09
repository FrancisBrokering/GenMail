import {
  Box,
  Checkbox,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import InstructionStep from "./InstructionStep";

type SelectToneProps = {
  setReceiver: (tone: string) => void;
  receiver: string;
  currentStep: number;
};

const SelectReceiver = (props: SelectToneProps) => {
  const { t } = useTranslation();
  const Placeholder_Color = useColorModeValue("gray.500", "gray.200");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const toneOptions = [
    { value: "my boss", label: "👨‍🏫 " + t("receiver.boss") },
    { value: "colleague", label: "🧑‍💻 " + t("receiver.colleague") },
    { value: "friend", label: "🤝 " + t("receiver.friend") },
    { value: "business Partner", label: "👔 " + t("receiver.partner") },
    { value: "family member", label: "👨‍👩‍👧‍👦 " + t("receiver.family") },
    { value: "lover", label: "👩‍❤️‍💋‍👨 " + t("receiver.lover") },
  ];

  return (
    <Box>
      <InstructionStep
        instructionPrompt={t("email.New.who")}
        stepNumber={3}
        currentStep={props.currentStep}
      />
      <RadioGroup
        mb={"10px"}
        _placeholder={{ color: Placeholder_Color }}
        placeholder={isOtherSelected ? "other" : props.receiver}
        onChange={(value) => {
          if (value === "other") {
            setIsOtherSelected(true);
          } else {
            setIsOtherSelected(false);
            props.setReceiver(value);
          }
        }}
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 6fr)",
            sm: "repeat(2, 3fr)",
            md: "repeat(3, 2fr)",
          }}
          gap={{ base: 1, md: 6 }}
        >
          {toneOptions.map((toneOption) => {
            return (
              <GridItem
                key={toneOption.value}
                border="solid #e2e8f0"
                h="55px"
                padding="0px 22px 0px 22px"
                rounded="8px"
                display="flex"
                alignItems="center"
                bg={props.receiver === toneOption.value ? "#F2F7FF" : "white"}
              >
                <Radio value={toneOption.value}>{toneOption.label}</Radio>
              </GridItem>
            );
          })}
          {
            <GridItem
              border="solid #e2e8f0"
              h="55px"
              padding="0px 22px 0px 22px"
              rounded="8px"
              display="flex"
              alignItems="center"
              bg={isOtherSelected ? "#F2F7FF" : "white"}
              colSpan={{ base: 1, md: 3 }}
            >
              <InputGroup>
                <Input
                  placeholder={t("tone.other") as string}
                  onChange={(e) => {
                    props.setReceiver(e.target.value);
                    setIsOtherSelected(true);
                  }}
                  // value={props.tone}
                />
              </InputGroup>
            </GridItem>
          }
        </Grid>
      </RadioGroup>
    </Box>
  );
};

export default SelectReceiver;
