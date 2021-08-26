// theme.ts

// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  //@ts-expect-error
  global: (props) => ({
    body: {
      bg: mode("white", "#000000")(props),
    },
  }),
};

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  fonts: {
    heading: "Open Sans",
    body: "Raleway",
  },
  styles,
});

export default theme;
