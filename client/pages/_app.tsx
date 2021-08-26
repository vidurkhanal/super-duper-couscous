import { CSSReset } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import Head from "next/head";
import { Chakra } from "../utils/Chakra";

function MyApp({ Component, pageProps }: any) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Head>
        <title>KPass, Best Free Password Manager</title>
      </Head>
      <CSSReset />
      <Component {...pageProps} />
    </Chakra>
  );
}

export default MyApp;
