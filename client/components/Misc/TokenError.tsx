import { Flex, Image, Text } from "@chakra-ui/react";

export const TokenError = () => {
  return (
    <>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Image
            src="/verifyemail.png"
            alt="Verify Your Email"
            loading="eager"
            height="250px"
            width="auto"
            objectFit="contain"
          />
          <Text textAlign="center" color="blue.500" fontSize="3rem">
            404
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
