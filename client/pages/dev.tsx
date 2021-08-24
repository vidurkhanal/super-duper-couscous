import { withUrqlClient } from "next-urql";
import { URQLClient } from "../utils/createClient";
import { useVerifyMasterPinMutation } from "../generated/graphql";
import { useEffect } from "react";

const Dev = () => {
  return <div>hey</div>;
};

export default withUrqlClient(URQLClient, { ssr: true })(Dev);
