import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useResetPasswordMutation } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwords, setPasswords] = useState<{
    password: string;
    confirm_password: string;
  }>({ password: "", confirm_password: "" });
  const router = useRouter();
  const [, resetPassword] = useResetPasswordMutation();
  const toast = useToast();
  useEffect(() => {
    setToken(router?.query?.token as string);
    console.log(router.query);
  }, [router]);
  const formResetter = () => {
    setPasswords({ confirm_password: "", password: "" });
  };

  const resetPasswordSubmitter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (passwords.confirm_password !== passwords.password) {
      toast({
        title: "Hmm, The passwords didn't match...",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
      formResetter();
      setIsSubmitting(false);
      return;
    }

    const { data } = await resetPassword({
      key: token,
      newPassword: passwords.password,
    });

    if (data?.forgotPasswordChange.error) {
      toast({
        title: data.forgotPasswordChange.error,
        status: "error",
        isClosable: true,
        duration: 5000,
      });
      formResetter();
      setIsSubmitting(false);
      return;
    }

    if (data?.forgotPasswordChange.isChanged) {
      toast({
        title: "Password Has Been Sucessfully Reset",
        description: "Redirecting you to the login page...",
        status: "success",
        isClosable: true,
        duration: 5000,
      });
      formResetter();
      setIsSubmitting(false);
      return setTimeout(() => {
        router.push("/authentication/login");
      }, 3000);
    }
  };

  if (token?.length < 1) {
    return (
      <Flex
        height="100vh"
        minWidth="100vw"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Flex>
    );
  } else {
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <form onSubmit={resetPasswordSubmitter}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Reset Your Password</Heading>
            </Stack>
            <Box
              rounded={"lg"}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="password">
                  <FormLabel>Enter New Password</FormLabel>
                  <Input
                    type="password"
                    name="new password"
                    required
                    value={passwords.password}
                    onChange={(e) =>
                      setPasswords({
                        password: e.target.value,
                        confirm_password: passwords.confirm_password,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="confirm_password">
                  <FormLabel>Reenter Your Password</FormLabel>
                  <Input
                    type="password"
                    name="confirm password"
                    required
                    value={passwords.confirm_password}
                    onChange={(e) =>
                      setPasswords({
                        password: passwords.password,
                        confirm_password: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"blue.400"} href="/authentication/login">
                      Do not need to reset it?
                    </Link>
                  </Stack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Reset My Password
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Flex>
    );
  }
};
export default withUrqlClient(URQLClient)(ResetPassword);
