import { Flex, useToast, Button, Image, Text } from "@chakra-ui/react";
import NextRouter from "next/router";
import { useState } from "react";
import {
  useLogoutUserMutation,
  useResendVerificationEmailMutation,
} from "../generated/graphql";

export const NotVerifiedPage = () => {
  const [, logoutUser] = useLogoutUserMutation();
  const [, resendeEmail] = useResendVerificationEmailMutation();
  const [isSubmittin, setIsSubmitting] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const toast = useToast();

  const handleLogout = async () => {
    setIsSubmitting(true);

    await logoutUser();
    NextRouter.reload();

    setIsSubmitting(false);
  };

  console.log("hey");

  const handleResend = async () => {
    setIsSending(true);
    const { data, error } = await resendeEmail();
    if (error) {
      toast({
        title: error,
        status: "error",
      });
    } else {
      setIsSent(data?.resendVerifyEmail as boolean);
    }
    setIsSending(false);
  };

  return (
    <>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Image
            src="/verifyemail.png"
            alt="Verify Your Email"
            loading="eager"
            height="250px"
            width="auto"
            objectFit="contain"
          />
          <Text textAlign="center" width="70vw">
            Oops!! Your email has not been verified yet. Please check your
            mailbox for the verification email.
            <br />
            Or Do you want us send you one more!?
          </Text>
          <Button
            mt="1rem"
            onClick={handleResend}
            isLoading={isSending}
            isDisabled={isSent}
          >
            {!isSent ? "Resend Email" : "Sent"}
          </Button>
          <Button mt="1rem" onClick={handleLogout} isLoading={isSubmittin}>
            Sign Out
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
