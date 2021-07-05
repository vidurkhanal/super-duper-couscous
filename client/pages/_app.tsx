import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../utils/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>NAME OF THE APP</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
