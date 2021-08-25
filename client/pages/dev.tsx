import { withUrqlClient } from "next-urql";
import { URQLClient } from "../utils/createClient";

const Dev = () => {
  return <div>hey</div>;
};

export default withUrqlClient(URQLClient, { ssr: true })(Dev);
