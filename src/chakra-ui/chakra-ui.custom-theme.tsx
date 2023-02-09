import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export const chakraCustomTheme = extendTheme({
  config,
  breakpoints: {
    sm: "30em",
    md: "53em", //default: 48em
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  // styles: (props: any) => ({
  //   'html, body' : {
  //     color: props.colorMode === "dark" ? "gray.800" : "gray.100",
  //   }
  // })
});
