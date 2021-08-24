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

  if (!MeFetching && !MeData?.me) {
    return (
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
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
                      <Checkbox>Remember me</Checkbox>
                      <Link color={"blue.500"} href="/forgetpassword">
                        Forgot password?
                      </Link>
                    </Stack>
                    <Button
                      colorScheme={"blue"}
                      variant={"solid"}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Sign in
                    </Button>
                    <Text align="center" userSelect="none" fontWeight="bold">
                      OR
                    </Text>
                    <Button
                      colorScheme={"blue"}
                      variant={"solid"}
                      onClick={() =>
                        NextRouter.push("/authentication/register")
                      }
                    >
                      Need An Account?
                    </Button>
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
            draggable="false"
            src={
              "https://images.unsplash.com/photo-1626643590239-4d5051bafbcc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
            }
          />
        </Flex>
      </Stack>
    );
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(Login);
