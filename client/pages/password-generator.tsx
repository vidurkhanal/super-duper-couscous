import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Head from "next/head";
import { NavBar } from "../components/LandingPage/NavBar";

const PasswordGenerator: React.FC = ({}) => {
  return (
    <Box>
      <Head>
        <title>Create A Secure Password</title>
      </Head>
      <NavBar />
      <main>
        <Flex
          backgroundColor={"#293A52"}
          height="70px"
          placeItems="center"
          justifyContent="center"
        >
          <Flex alignItems="center">
            <Text
              fontWeight="bold"
              fontSize="2xl"
              my="15px"
              paddingRight="20px"
              color="white"
            >
              SECURED PASSWORD MANAGER FOR FREE
            </Text>
            <Button colorScheme="orange">Sign Up Today.</Button>
          </Flex>
        </Flex>
        <Flex
          marginLeft="auto"
          marginRight="auto"
          width="800px"
          //   backgroundColor="red.400"
          mt="70px"
        >
          <Flex flexDirection="column" placeItems="center" minWidth="100%">
            <Text
              textTransform="uppercase"
              my="30px"
              color="orange"
              fontWeight="extrabold"
            >
              {" "}
              [name] Password Generator
            </Text>
            <Text textTransform="uppercase" fontWeight="bold" fontSize="3xl">
              Generate A Secure Password
            </Text>
            <Text textTransform="uppercase" fontSize="sm" mt="5px">
              Create A Secure Password By Using This Free [App Name] Password
              Generator Tool
            </Text>
          </Flex>
        </Flex>
      </main>
    </Box>
  );
};
export default PasswordGenerator;
