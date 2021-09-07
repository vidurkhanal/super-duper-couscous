import { Box, Input } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Password } from "../components/Home/Password";
import { Wrapper } from "../components/Home/Wrapper";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";
import FuzzySearch from "fuzzy-search";
import { PassObj } from "../types";

const Dev = () => {
  const [query, setQuery] = useState("");
  const [{ data }] = useMeQuery();
  const [result, setResult] = useState<PassObj[]>([]);
  const store = data?.me?.credentials as PassObj[];
  useEffect(() => {
    const searcher = new FuzzySearch(store, ["siteName"]);
    setResult(searcher.search(query));
  }, [store, query]);
  return (
    <div>
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
            ? store?.map((item) => <Password key={nanoid()} pass={item} />)
            : result.map((hit) => <Password key={nanoid()} pass={hit} />)}
        </Wrapper>
      </Box>
    </div>
  );
};

export default withUrqlClient(URQLClient)(Dev);
