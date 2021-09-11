import { Flex, Link, Image, Text } from "@chakra-ui/react";
import NextRouter from "next/router";
import { useEffect } from "react";

export const VerifiedEmail = () => {
  useEffect(() => {
    setTimeout(() => {
      NextRouter.push("/authentication/login");
    }, 2000);
  }, []);
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
          <Text textAlign="center" width="70vw">
            <Text color="blue.500" fontSize="3rem">
              Yayyyy
            </Text>
            You have been verified. You can now you our services without any
            issues. You ll now be redirected to login.
            <br />
            Click{" "}
            <Link color="blue.500" href="/authentication/login">
              here
            </Link>{" "}
            if it does not happen on its own.
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
