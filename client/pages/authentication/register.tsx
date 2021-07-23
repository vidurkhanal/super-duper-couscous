import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { withUrqlClient } from "next-urql";
import { useRegisterUserMutation } from "../../generated/graphql";
import { URQLClient } from "../../utils/createClient";

const Login = () => {
  const [, registerUser] = useRegisterUserMutation();
  const toast = useToast();

  const handleSubmit = async (values, actions) => {
    console.log(values);
    const { data, error } = await registerUser(values);
    if (error) {
      toast({
        title: error.message,
        status: "error",
      });
    }

    if (data.registerUser.error) {
      toast({
        title: data.registerUser.error,
        status: "error",
      });
    }

    if (data.registerUser.user) {
      toast({
        title: "Logged In Succesfully...",
        status: "success",
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Register your account</Heading>
          <Formik
            initialValues={{ email: "", password: "", fullName: "" }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="fullName">
                  {({ field, form: _ }) => (
                    <FormControl id="fullName" name="fullName">
                      <FormLabel htmlFor="fullName">Full Name</FormLabel>
                      <Input
                        mb={3}
                        type="fullName"
                        id="fullName"
                        {...field}
                        placeholder="Enter your Full Name"
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form: _ }) => (
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
                  {({ field, form: _ }) => (
                    <FormControl id="password" name="password">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        type="password"
                        mb={3}
                        id="password"
                        {...field}
                        placeholder="Enter your Password"
                      />
                    </FormControl>
                  )}
                </Field>
                <Stack spacing={6} mt={6}>
                  <Button
                    colorScheme={"blue"}
                    variant={"solid"}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Register
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
