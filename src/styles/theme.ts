import {

  extendTheme,
  type ThemeConfig,
  theme as baseTheme,
} from "@chakra-ui/react";

import {
  mode,
  StyleFunctionProps,
} from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brandGreen: {
    50: "#031112", //black green
    100: "#051F20", //dark green
    200: "#163832", //medium green
    300: "#235347", //forest green
    400: "#8EB69B", //sea green
    500: "#DAF1DE", //light green
  },
  brandBlue: {
    100: "#83A7AF", //
  },
  brandYellow: {
    100: "#EDB25A", //yellow
    200: "#E19820", //mustard
  },
  brandOrange: {
    100: "#F7893B", //light orange
    200: "#DB6320", //orange
    300: "#ED4F05", //dark orange
  },
  brandRed: {
    100: "#D93128",
  },
  neutralGreen: {
    100: "#a1bd9a",
  },
  light: {
    100: "#b2b2b2",
    200: "#808080",
    300: "#171717",
  },
  dark: {
    100: "#1C1D1F",
    200: '#161718'

  },
  darkGlass: {
    100: "rgba(0,0,0, .2)",
    200: "rgba(0,0,0, .5)",
    300: "rgba(0,0,0, .7)",
  },
  lightGlass: {
    100: "rgba(255,255,255, .2)",
    200: "rgba(255,255,255, .5)",
  },
  darkMode: {
    100: '#292929',
  },
  primaryFontColor: {
    lightMode: baseTheme.colors.gray["100"],
    darkMode: baseTheme.colors.gray["700"],
  },
  secondaryFontColor: {
    lightMode: baseTheme.colors.white["600"],
    darkMode: baseTheme.colors.white["400"],
  },
};

const styles = {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('white', colors.dark[100])(props),
      },
    }),
};

const components = {
    // Text: {
    //   baseStyle: (props: any) => ({
    //     color: mode(
    //       colors.primaryFontColor.lightMode,
    //       colors.primaryFontColor.darkMode
    //     )(props),
    //   }),
    // },
    // Heading: {
    //   baseStyle: {
    //     color: "black",
    //   },
    // },
    variants: {
      flexCenter: {
        display: "flex",
        align: "center",
        textAlign: "center",
      },
      secondary: (props: any) => ({
        color: mode(
          colors.secondaryFontColor.lightMode,
          colors.secondaryFontColor.darkMode
        )(props),
      }),
    },
};

const breakpoints = {
  sm: "0px",
  md: "600px",
  lg: "1024px",
  xl: "1920px",
  "2xl": "4096px",
};

const theme = extendTheme({
  config,
  colors,
  breakpoints,
  components,
  styles
});


export default theme;
