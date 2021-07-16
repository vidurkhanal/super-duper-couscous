import { Box, Text } from "@chakra-ui/react";
import { Password } from "../components/Home/Password";
import { Wrapper } from "../components/Home/Wrapper";
import { sample_server_res } from "../types";

const PasswordPage = () => {
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

export default PasswordPage;
