import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { BRAND_COLOR_RED, HOVER_BRAND_COLOR_RED } from "../../constants";

type FormikValues = {
  oldPassword: string;
  password: string;
  passwordReenter: string;
};

export const ChangePassword: React.FC = () => {
  const toast = useToast();
  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    toast({
      title: "DO WHAT YOU WANTED TO DO HERE",
      status: "error",
      duration: 1000,
    });

    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <Box>
      <Heading
        pb="3rem"
        fontSize={{ base: "4xl", md: "5xl" }}
        fontWeight="bold"
        fontFamily="heading"
      >
        Change Your Password
      </Heading>
      <Formik
        initialValues={{ oldPassword: "", password: "", passwordReenter: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="oldPassword">
              {({ field, form: _ }: any) => (
                <FormControl id="password" name="password">
                  <FormLabel htmlFor="password">Current Password</FormLabel>
                  <Input
                    mb={3}
                    type="password"
                    id="password"
                    {...field}
                    placeholder="Enter your current password"
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
                    placeholder="Enter your new password"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="passwordReenter">
              {({ field, form: _ }: any) => (
                <FormControl id="password" name="password">
                  <FormLabel htmlFor="password">
                    Re Enter your password
                  </FormLabel>
                  <Input
                    mb={3}
                    type="password"
                    id="password"
                    {...field}
                    placeholder="Re enter your new password"
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
                <Link href="/forgetpassword">Forgot password?</Link>
              </Stack>
              <Box alignSelf="flex-end">
                <Link
                  href="/passwords"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <Button variant="outline" mr="10px">
                    Cancel
                  </Button>
                </Link>
                <Button
                  background={BRAND_COLOR_RED}
                  _hover={{
                    background: HOVER_BRAND_COLOR_RED,
                  }}
                  variant={"solid"}
                  type="submit"
                  isLoading={isSubmitting}
                  color="white"
                >
                  Change Password
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
