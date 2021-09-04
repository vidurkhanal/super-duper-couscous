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
import { Formik, FormikHelpers, Form, Field } from "formik";
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
        title: "Hmm, The passwords didn't match...",
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
        title: "Master PIN should be of a digit numeric.",
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
      <Heading py="3rem" fontSize={"2xl"}>
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
            <Field name="masterPIN">
              {({ field, form: _ }: any) => (
                <FormControl id="password" name="password">
                  <FormLabel htmlFor="password">Master PIN</FormLabel>
                  <Input
                    mb={3}
                    type="password"
                    id="password"
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
                    Re Enter your Master PIN
                  </FormLabel>
                  <Input
                    mb={3}
                    type="password"
                    id="password"
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
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};
