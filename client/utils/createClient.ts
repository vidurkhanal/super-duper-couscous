import { cacheExchange, dedupExchange, fetchExchange } from "urql";
import { __PROD__ } from "../constants";

const url = __PROD__
  ? "https://api.kpass12.ninja/graphql"
  : "http://localhost:8080/graphql";

export const URQLClient = (ssrExchange: any, _ctx: any) => ({
  url: url,
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
