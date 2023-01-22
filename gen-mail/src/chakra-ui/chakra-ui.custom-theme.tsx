import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export const chakraCustomTheme = extendTheme({
  config,
  breakpoints: {
    sm: '30em',
    md: '53em',  //default: 48em
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }
});

// export function deleteColorModeInLocalStorage() {
//     window.localStorage.removeItem("chakra-ui-color-mode");
//     // console.log('deleted "chakra-ui-color-mode" from local storage');
//     // console.log("You can now refresh to see how a first visit looks like.");
// }

// setTimeout(deleteColorModeInLocalStorage, 3000);
