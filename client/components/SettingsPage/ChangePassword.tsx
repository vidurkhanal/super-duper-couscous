import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, FormikHelpers } from "formik";
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
    <>
      <Heading pb="3rem" fontSize={"2xl"}>
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
                  <FormLabel htmlFor="password">Old Password</FormLabel>
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
              <Button
                background={BRAND_COLOR_RED}
                _hover={{
                  background: HOVER_BRAND_COLOR_RED,
                }}
                variant={"solid"}
                type="submit"
                isLoading={isSubmitting}
              >
                Change Password
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};
