import { Input, Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Password } from "../components/Home/Password";
import { Wrapper } from "../components/Home/Wrapper";
import { LoadingPage } from "../components/Misc/LoadingPage";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";
import NextRouter from "next/router";
import Head from "next/head";
import { memo, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { PassObj } from "../types";
import FuzzySearch from "fuzzy-search";
import { NotVerifiedPage } from "../components/Misc/NotVerifiedPage";
import { NextPage } from "next";

const PasswordPage: NextPage = () => {
  const [{ data, fetching }] = useMeQuery();
  const credentialArray = data?.me?.credentials || [];
  const isVerified = data?.me?.isVerified;
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

  if (!fetching && !data?.me?.hasMasterPIN) {
    NextRouter.push("/authentication/create-master-pin");
  }

  if (!fetching && data?.me?.hasMasterPIN) {
    if (isVerified)
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
    else return <NotVerifiedPage />;
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(memo(PasswordPage));
