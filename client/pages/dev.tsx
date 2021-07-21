import { withUrqlClient } from "next-urql";
import { useEffect } from "react";
import { useQuery } from "urql";
import { useLoginUserMutation } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";
import { decode } from "../utils/decode";

const GetCredentials = `
  query ($userID: String!) {
    getCredentials (userID: $userID) {
    email
    password
    }
  }
`;

const Dev = () => {
  const [, loginUser] = useLoginUserMutation();

  const [result] = useQuery({
    query: GetCredentials,
    //This probably can be obtained from session
    //We can change that later this is just to test
    variables: { userID: "b987e178-eaa8-42ff-bc0c-a5ac8ec777bb" },
  });

  useEffect(() => {
    const loginU = async () => {
      await loginUser({
        email: "enter your email",
        password: "enter your password",
      });
    };
    loginU();
    const { data } = result;
    const pass = data.getCredentials[1].password;
    console.log(decode(pass));
  }, []);

  return <div>Hey there</div>;
};

export default withUrqlClient(URQLClient, { ssr: true })(Dev);
