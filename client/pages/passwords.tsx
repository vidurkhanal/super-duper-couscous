import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useEffect } from "react";
import { Password } from "../components/Home/Password";
import { Wrapper } from "../components/Home/Wrapper";
import { LoadingPage } from "../components/LoadingPage";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";

const PasswordPage = () => {
  const [{ data, fetching }] = useMeQuery();
  const credentialArray = data?.me?.credentials || [];
  useEffect(() => {
    if (!fetching && !data?.me) window.location.href = "/authentication/login";
  }, [data, fetching]);

  if (data?.me) {
    return (
      <Box>
        <Wrapper>
          {credentialArray.map((item, index) => (
            <Password key={index} pass={item} />
          ))}
        </Wrapper>
      </Box>
    );
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(PasswordPage);
