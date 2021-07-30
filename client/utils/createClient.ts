import { cacheExchange, dedupExchange, fetchExchange } from "urql";

export const URQLClient = (ssrExchange: any, _ctx: any) => ({
  url: "https://api.kpass12.ninja/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
