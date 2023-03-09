import React, { useEffect } from "react";
import { Box, FormLabel, HStack, Text, Img } from "@chakra-ui/react";
import { ReactComponent as StepBlue } from "../../assets/icons/StepBlue.svg";
import { ReactComponent as StepWhite } from "../../assets/icons/StepWhite.svg";
import glowingStep from "../../assets/images/glowingStep.gif";

type InstructionStepProps = {
  instructionPrompt: string;
  stepNumber: number;
  currentStep: number;
};

const InstructionStep = (props: InstructionStepProps) => {
  return (
    <HStack textAlign="center" alignItems="center" ml="-16px">
      <Box
        position="relative"
        padding={props.stepNumber === props.currentStep ? "0px" : "30px"}
      >
        <Img
          zIndex={0}
          src={glowingStep}
          alt="glowingStep"
          position="relative"
          width="60px"
          height="60px"
          display={props.stepNumber === props.currentStep ? "block" : "none"}
        />
        {props.stepNumber <= props.currentStep ? (
          <StepBlue
            style={{
              zIndex: 1,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            width="26px"
            height="26px"
          />
        ) : (
          <StepWhite
            style={{
              zIndex: 1,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            width="26px"
            height="26px"
          />
        )}
        <Text
          zIndex={2}
          color={props.stepNumber <= props.currentStep ? "white" : "#0968D3"}
          fontWeight="700"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          {props.stepNumber}
        </Text>
      </Box>
      <FormLabel margin="0">{props.instructionPrompt}</FormLabel>
    </HStack>
  );
};

export default InstructionStep;
