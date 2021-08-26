import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
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
import { BRAND_COLOR_RED, HOVER_BRAND_COLOR_RED } from "../constants";
import { useResetPasswordMutation } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";
import NextLink from "next/link";

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
  const logoSrc = useColorModeValue(
    "/Kpass-primary.png",
    "/Kpass-secondary.png"
  );

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
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <form onSubmit={resetPasswordSubmitter}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Box
              rounded={"lg"}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("white", "#171923")}
              boxShadow={"lg"}
              p={8}
            >
              <NextLink href="/">
                <Image
                  src={logoSrc}
                  loading="eager"
                  width="70px"
                  height="auto"
                  alt="Brand Secondary Logo"
                />
              </NextLink>
              <Stack mb="20px">
                <Heading fontSize={"3xl"}>Reset Your Password</Heading>
              </Stack>
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
                    <Link href="/authentication/login">
                      Do not need to reset it?
                    </Link>
                  </Stack>
                  <Button
                    bg={BRAND_COLOR_RED}
                    color={"white"}
                    _hover={{
                      bg: HOVER_BRAND_COLOR_RED,
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
