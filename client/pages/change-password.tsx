import { Box, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import NextRouter from "next/router";
import { Wrapper } from "../components/Home/Wrapper";
import { LoadingPage } from "../components/Misc/LoadingPage";
import { ChangePassword } from "../components/SettingsPage/ChangePassword";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";

const ChangePasswordPage: NextPage = () => {
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
            <ChangePassword />
          </Flex>
        </Wrapper>
      </Box>
    );
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(ChangePasswordPage);
