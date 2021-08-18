import { Flex, Spinner } from "@chakra-ui/react";

export const LoadingPage = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner />
    </Flex>
  );
};
