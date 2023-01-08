import React from 'react';
import { useColorMode, FormControl, FormLabel, Switch, Flex } from '@chakra-ui/react';

const ChangeThemeColor = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    console.log(colorMode)
    return (
        <FormControl ml={"25px"} mt="20px">
          <Flex>
            <FormLabel>{colorMode === "dark" ? "Light Theme" : "Dark Theme"}</FormLabel>
            <Switch
                size={"md"}
                mt="5px"
                // defaultChecked={colorMode === "dark" ? true : false}
                onChange={toggleColorMode}
            />
          </Flex>
        </FormControl>
    )
}

export default ChangeThemeColor;