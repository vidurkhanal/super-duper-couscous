import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { withUrqlClient } from "next-urql";
import { useLoginUserMutation, useMeQuery } from "../../generated/graphql";
import { URQLClient } from "../../utils/createClient";
import NextRouter from "next/router";
import { LoadingPage } from "../../components/LoadingPage";
import { useColorModeValue } from "@chakra-ui/react";
import { BRAND_COLOR_RED, HOVER_BRAND_COLOR_RED } from "../../constants";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [{ data: MeData, fetching: MeFetching }] = useMeQuery();
  const [, loginUser] = useLoginUserMutation();
  const toast = useToast();

  if (!MeFetching && MeData?.me) {
    NextRouter.push("/passwords");
  }

  const handleSubmit = async (values: FormValues, actions: any) => {
    const { data, error } = await loginUser(values);
    if (error) {
      toast({
        title: error.message,
        status: "error",
      });
    }

    if (data?.loginUser.error) {
      toast({
        title: data.loginUser.error,
        status: "error",
      });
    }

    if (data?.loginUser.user) {
      toast({
        title: "Logged In Succesfully...Redirecting to home page",
        status: "success",
      });
      setTimeout(() => {
        window.location.href = "/passwords";
      }, 2000);
    }
    actions.setSubmitting(false);
  };

  const logoSrc = useColorModeValue(
    "/Kpass-primary.png",
    "/Kpass-secondary.png"
  );

  if (!MeFetching && !MeData?.me) {
    return (
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Link href="/" _focus={{}}>
              <Image
                src={logoSrc}
                loading="eager"
                width="70px"
                height="auto"
                alt="Brand Secondary Logo"
              />
            </Link>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name="email">
                    {({ field, form: _ }: any) => (
                      <FormControl id="email" name="email">
                        <FormLabel htmlFor="email">Email address</FormLabel>
                        <Input
                          type="email"
                          mb={3}
                          id="email"
                          {...field}
                          placeholder="Enter your email"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form: _ }: any) => (
                      <FormControl id="password" name="password">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          mb={3}
                          type="password"
                          id="password"
                          {...field}
                          placeholder="Enter your password"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={6}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox colorScheme="red">Remember me</Checkbox>
                      <Link href="/forgetpassword">Forgot password?</Link>
                    </Stack>
                    <Button
                      background={BRAND_COLOR_RED}
                      _hover={{
                        background: HOVER_BRAND_COLOR_RED,
                      }}
                      variant={"solid"}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Sign in
                    </Button>
                    <Text align="center" userSelect="none" fontWeight="bold">
                      OR
                    </Text>
                    <Link
                      href="/authentication/register"
                      _hover={{
                        textDecoration: "none",
                      }}
                    >
                      <Button
                        colorScheme={"facebook"}
                        variant={"outline"}
                        width="100%"
                      >
                        Need An Account?
                      </Button>
                    </Link>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            height="100vh"
            draggable="false"
            src={"/login-bg.jpeg"}
            loading="eager"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
      </Stack>
    );
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(Login);
