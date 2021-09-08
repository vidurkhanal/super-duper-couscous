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
import { useChangeMasterPinMutation } from "../../generated/graphql";

interface FormValues {
  password: string;
  masterPIN: string;
  mastePINReenter: string;
}

export const ChangeMasterPIN: React.FC = () => {
  const [, changeMasterPIN] = useChangeMasterPinMutation();
  const toast = useToast();

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { mastePINReenter, masterPIN, password } = values;

    if (mastePINReenter !== masterPIN) {
      toast({
        title: "Hmm, The new PINs don't match...",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
      actions.resetForm();
      actions.setSubmitting(false);
      return;
    }

    let flag = false;
    const arr = values.masterPIN.split("");

    for (const n of arr) {
      if (n.charCodeAt(0) > 57 || n.charCodeAt(0) < 48) flag = true;
    }

    if (flag)
      toast({
        title: "Master PIN should be a 4 digit number.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    else {
      const { data, error } = await changeMasterPIN({ masterPIN, password });

      if (error)
        toast({
          title: error.message,
          status: "error",
          duration: 1000,
        });
      else if (data?.changeMasterPIN.error)
        toast({
          title: data.changeMasterPIN.error,
          status: "error",
          duration: 1000,
        });
      else
        toast({
          title: "Master PIN Changed Succesfully",
          status: "error",
          duration: 1000,
        });
      actions.resetForm();
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Heading pb="3rem" fontSize={{ base: "4xl", md: "5xl" }}>
        Change Your Master PIN
      </Heading>
      <Formik
        initialValues={{ password: "", masterPIN: "", mastePINReenter: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="password">
              {({ field, form: _ }: any) => (
                <FormControl id="password" name="password">
                  <FormLabel htmlFor="password">Current Password</FormLabel>
                  <Input
                    mb={3}
                    required
                    type="password"
                    id="password"
                    {...field}
                    placeholder="Enter your current password"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="masterPIN">
              {({ field, form: _ }: any) => (
                <FormControl id="password" name="password">
                  <FormLabel htmlFor="password">New Master PIN</FormLabel>
                  <Input
                    mb={3}
                    type="password"
                    required
                    id="password"
                    maxLength={4}
                    {...field}
                    placeholder="Enter your new Master PIN"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="mastePINReenter">
              {({ field, form: _ }: any) => (
                <FormControl id="password" name="password">
                  <FormLabel htmlFor="password">
                    Re Enter your new Master PIN
                  </FormLabel>
                  <Input
                    mb={3}
                    type="password"
                    required
                    id="password"
                    maxLength={4}
                    {...field}
                    placeholder="Re enter your new Master PIN"
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
                  justifySelf="flex-end"
                >
                  Change Master PIN
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};
