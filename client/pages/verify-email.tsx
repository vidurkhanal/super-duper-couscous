import { useRouter } from "next/router";
import { useEffect } from "react";
import { __PROD__ } from "../constants";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { URQLClient } from "../utils/createClient";
import { useVerifyEmailMutation } from "../generated/graphql";
import { LoadingPage } from "../components/LoadingPage";
import { VerifiedEmail } from "../components/VerifiedPage";
import { TokenError } from "../components/TokenError";

const VerifyEmail: React.FC = ({}) => {
  const [, verifyEmail] = useVerifyEmailMutation();
  const [token, setToken] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isSubmittin, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const fetch = async () => {
    setIsSubmitting(true);
    const { data } = await verifyEmail({ token });
    data && setIsVerified(data?.verifyEmail);
    setIsSubmitting(false);
  };

  useEffect(() => {
    setToken(router?.query?.token as string);
    fetch();
  }, [router]);

  if (!isSubmittin)
    return <>{isVerified ? <VerifiedEmail /> : <TokenError />}</>;

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(VerifyEmail);
