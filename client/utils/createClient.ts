import { cacheExchange, dedupExchange, fetchExchange } from "urql";

export const URQLClient = (ssrExchange: any, _ctx: any) => ({
  url: "http://localhost:8080/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
