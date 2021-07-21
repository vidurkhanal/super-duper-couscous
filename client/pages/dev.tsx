import { withUrqlClient } from "next-urql";
import { useEffect } from "react";
import { useLoginUserMutation } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";

const Dev = () => {
  const [, loginUser] = useLoginUserMutation();
  useEffect(() => {
    const loginU = async () => {
      await loginUser({
        email: "enter your email",
        password: "enter your password",
      });
    };
    loginU();
  }, []);

  return <div>Hey there</div>;
};

export default withUrqlClient(URQLClient, { ssr: true })(Dev);
