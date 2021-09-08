import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Password } from "../components/Home/Password";
import { Wrapper } from "../components/Home/Wrapper";
import { LoadingPage } from "../components/LoadingPage";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";
import NextRouter from "next/router";
import Head from "next/head";
import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { memo } from "react";
import { PassObj } from "../types";
import FuzzySearch from "fuzzy-search";

const PasswordPage = () => {
  const [{ data, fetching }] = useMeQuery();
  const credentialArray = data?.me?.credentials || [];
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<PassObj[]>([]);

  if (!fetching && !data?.me) {
    NextRouter.push("/authentication/login");
  }

  useEffect(() => {
    //@ts-expect-error
    const searcher = new FuzzySearch(data?.me?.credentials, ["siteName"]);
    setResult(searcher.search(query));
  }, [data?.me, query]);

  if (!fetching && data?.me?.isVerified) {
    return (
      <Box>
        {" "}
        <Head>
          <title>Dashboard - KPass</title>
        </Head>
        <Wrapper>
          <Input
            width={{ base: "100%", md: "50%" }}
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder="Search for a credential"
          />
          {query.length === 0
            ? credentialArray.map((item) => (
                <Password key={nanoid()} pass={item} />
              ))
            : result.map((hit) => <Password key={nanoid()} pass={hit} />)}
        </Wrapper>
      </Box>
    );
  }

  if (!fetching && !data?.me?.isVerified) {
    return (
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Image
            src="/verifyemail.png"
            alt="Verify Your Email"
            loading="eager"
            height="250px"
            width="auto"
            objectFit="contain"
          />
          <Text textAlign="center" width="70vw">
            Oops!! Your email has not been verified yet. Please check your
            mailbox for the verification email. Or Do you want us send you an
            another one!?
          </Text>
        </Flex>
      </Flex>
    );
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(memo(PasswordPage));
