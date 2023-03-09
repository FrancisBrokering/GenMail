const TourConfig = `
    steps={steps}
    afterOpen={disableBody}
    beforeClose={enableBody}
    badgeContent={({ totalSteps, currentStep }) =>
    currentStep + 1 + "/" + totalSteps
    }
    prevButton={({ currentStep, setCurrentStep, steps }) => {
    const first = currentStep === 0
    return (
        <Box
        onClick={() => {
            if (first) {
            if (steps?.length) {
                setCurrentStep((s) => steps.length - 1)
            }
            } else {
            setCurrentStep((s) => s - 1)
            }
        }}
        >
        <Flex alignItems={"center"}>
            {first ? null : <Icon as={ArrowBackIcon} boxSize={5} mr={"5px"}/>}
            <Text>{first ? 'Back' : 'Back'}</Text>
        </Flex>
        </Box>
    )
    }}

    nextButton={({
    currentStep,
    stepsLength,
    setIsOpen,
    setCurrentStep,
    steps,
    }) => {
    const last = currentStep === stepsLength - 1
    return (
        <Box
        onClick={() => {
            if (last) {
                setIsOpen(false)
            } else {
                if (steps?.length){
                setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
                }
            }
        }}
        _hover={{ cursor: "pointer" }}
        >
        <Flex alignItems={"center"}>
            <Text>{last ? 'Close' : 'Next'}</Text>
            {last ? null : <Icon as={ArrowForwardIcon} boxSize={5} ml={"5px"}/>}
        </Flex>
        </Box>
    )}
    }
    styles={{
    popover: (base) => ({
        ...base,
        "--reactour-accent": "#ef5a3d",
        borderRadius: radius,
    }),
    maskArea: (base) => ({ ...base, rx: radius }),
    badge: (base) => ({ ...base, left: "auto", right: "-0.8125em" }),
    controls: (base) => ({ ...base, marginTop: 30 }),
    close: (base) => ({ ...base, right: "auto", left: 8, top: 8 }),
    }}
`

export default TourConfig;
