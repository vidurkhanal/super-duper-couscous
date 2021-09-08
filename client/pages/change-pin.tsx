import { Box, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import NextRouter from "next/router";
import { Wrapper } from "../components/Home/Wrapper";
import { LoadingPage } from "../components/LoadingPage";
import { ChangeMasterPIN } from "../components/SettingsPage/ChangeMasterPin";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";

const SettingsPage = () => {
  const [{ data, fetching }] = useMeQuery();

  if (!fetching && !data?.me) {
    NextRouter.push("/authentication/login");
  }

  if (!fetching && data?.me) {
    return (
      <Box>
        <Head>
          <title>Settings - KPass</title>
        </Head>
        <Wrapper>
          <Flex direction="column" width={{ base: "90vw", md: "60vw" }}>
            <ChangeMasterPIN />
          </Flex>
        </Wrapper>
      </Box>
    );
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(SettingsPage);
