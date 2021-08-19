import { withUrqlClient } from "next-urql";
import { DeleteCredential } from "../components/DeleteCredential/DeleteModal";
import { PRIVATE_KEY } from "../constants";
import { URQLClient } from "../utils/createClient";

const Dev = () => {
  console.log(PRIVATE_KEY);
  return <div>hey</div>;
};

export default withUrqlClient(URQLClient, { ssr: true })(Dev);
