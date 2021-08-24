import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../utils/theme";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>KPass, Best Free Password Manager</title>
      </Head>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
