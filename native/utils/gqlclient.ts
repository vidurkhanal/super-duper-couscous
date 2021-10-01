import { dedupExchange, fetchExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";

const url = !__DEV__
  ? "https://api.kpass12.ninja/graphql"
  : "http://localhost:8080/graphql";

export const URQLClient = () => ({
  url,
  //   fetchOptions: {
  //     // credentials: "include" as const,
  //   },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {},
      },
    }),
    devtoolsExchange,
    fetchExchange,
  ],
});
