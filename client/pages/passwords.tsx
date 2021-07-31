import { Box, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Password } from "../components/Home/Password";
import { Wrapper } from "../components/Home/Wrapper";
import { useMeQuery } from "../generated/graphql";
import { sample_server_res } from "../types";
import { URQLClient } from "../utils/createClient";
import NextRouter from "next/router";
import { useEffect } from "react";

const PasswordPage = () => {
  //We need a loading page indicator thing here
  const [{ data }] = useMeQuery();
  const server_res: sample_server_res = {
    data: [
      {
        category: "personal",
        passwords: [
          {
            site: "account.apple.com",
            username: "hello@123.co",
            password: "password123",
            strength: "GOOD",
          },
          {
            site: "accounts.google.com",
            username: "mydreams@google.co",
            password: "Quit Dreaming And Get To Work",
            strength: "GOOD",
          },
        ],
      },
      {
        category: "payment and banking",
        passwords: [
          {
            site: "apple.money.com",
            username: "hello@123.co",
            password: "password123",
            strength: "GOOD",
          },
        ],
      },

      {
        category: "business",
        passwords: [
          {
            site: "yahoo.finance.com",
            username: "mybusinessemail@domain.com",
            password: "password123",
            strength: "GOOD",
          },
        ],
      },
    ],
  };

  useEffect(() => {
    if (!data?.me) NextRouter.push("/authentication/login");
  }, []);

  return (
    <Box>
      <Wrapper>
        {server_res.data.map((item, index) => {
          return (
            <Box key={index}>
              <Text
                textTransform="capitalize"
                fontSize="2xl"
                mb="10px"
                as="h1"
                fontWeight="600"
              >
                {item.category}
              </Text>
              {item.passwords.map((instance, id) => (
                <Password pass={instance} key={id} />
              ))}
            </Box>
          );
        })}
      </Wrapper>
    </Box>
  );
};

export default withUrqlClient(URQLClient, { ssr: true })(PasswordPage);
