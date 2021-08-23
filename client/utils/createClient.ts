import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { __PROD__ } from "../constants";
import { betterUpdateQuery } from "./betterUpdateQuery";
import {
  AddCredentialMutation,
  DeleteCredentialMutation,
  MeDocument,
  MeQuery,
} from "../generated/graphql";

const url = __PROD__
  ? "https://api.kpass12.ninja/graphql"
  : "http://localhost:8080/graphql";

export const URQLClient = (ssrExchange: any, _ctx: any) => ({
  url,
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          addCredential: (_result, args, cache, info) => {
            betterUpdateQuery<AddCredentialMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.addCredential.error) {
                  return query;
                } else {
                  return {
                    me: result.addCredential.user,
                  } as MeQuery;
                }
              }
            );
          },
          delCredentials: (_result, args, cache, info) => {
            betterUpdateQuery<DeleteCredentialMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.delCredentials.error) {
                  return query;
                } else {
                  return {
                    me: result.delCredentials.user,
                  } as MeQuery;
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
