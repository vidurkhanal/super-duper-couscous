import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Password } from "../components/Home/Password";
import { Wrapper } from "../components/Home/Wrapper";
import { LoadingPage } from "../components/LoadingPage";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";
import NextRouter from "next/router";
import Head from "next/head";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { memo } from "react";

const PasswordPage = () => {
  const [{ data, fetching }] = useMeQuery();
  const credentialArray = data?.me?.credentials || [];
  const [query, setQuery] = useState<string>("");

  if (!fetching && !data?.me) {
    NextRouter.push("/authentication/login");
  }

  if (!fetching && data?.me) {
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
            : credentialArray
                .filter(
                  (item) =>
                    item.email.includes(query) || item.siteName.includes(query)
                )
                .map((hit) => <Password key={nanoid()} pass={hit} />)}
        </Wrapper>
      </Box>
    );
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(memo(PasswordPage));
