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
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { withUrqlClient } from "next-urql";
import { useLoginUserMutation } from "../../generated/graphql";
import { URQLClient } from "../../utils/createClient";

const Login = () => {
  const [, loginUser] = useLoginUserMutation();
  const toast = useToast();
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, actions) => {
              const { data, error } = await loginUser(values);
              if (error) {
                toast({
                  title: error.message,
                  status: "error",
                });
              }

              if (data.loginUser.error) {
                toast({
                  title: data.loginUser.error,
                  status: "error",
                });
              }

              if (data.loginUser.user) {
                toast({
                  title: "Logged In Succesfully...",
                  status: "success",
                });
              }
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="email">
                  {({ field, form: _ }) => (
                    <FormControl id="email" name="email">
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Input
                        type="email"
                        id="email"
                        {...field}
                        placeholder="Enter your email"
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form: _ }) => (
                    <FormControl id="password" name="password">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
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
                    <Link color={"blue.500"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    colorScheme={"blue"}
                    variant={"solid"}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Sign in
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
};

export default withUrqlClient(URQLClient)(Login);
