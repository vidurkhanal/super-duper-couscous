import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useEffect } from "react";
import { Password } from "../components/Home/Password";
import { Wrapper } from "../components/Home/Wrapper";
import { LoadingPage } from "../components/LoadingPage";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";
import NextRouter from "next/router";
import Head from "next/head";

const PasswordPage = () => {
  const [{ data, fetching }] = useMeQuery();
  const credentialArray = data?.me?.credentials || [];

  if (!fetching && !data?.me) {
    NextRouter.push("/authentication/login");
  }

  if (!fetching && data?.me) {
    return (
      <Box>
        <Head>
          <title>Dashboard - KPass</title>
        </Head>
        <Wrapper>
          {credentialArray.map((item, index) => (
            //@ts-expect-error
            <Password key={index} pass={item} />
          ))}
        </Wrapper>
      </Box>
    );
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(PasswordPage);
