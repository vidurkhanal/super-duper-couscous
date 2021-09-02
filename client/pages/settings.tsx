import { Box } from "@chakra-ui/react"
import { withUrqlClient } from "next-urql"
import { Wrapper } from "../components/Home/Wrapper"
import { LoadingPage } from "../components/LoadingPage"
import { useMeQuery } from "../generated/graphql"
import { URQLClient } from "../utils/createClient"
import { Setting } from "../components/SettingsPage/Setting"
import NextRouter from "next/router"
import Head from "next/head"

const SettingsPage = () => {
  const [{ data, fetching }] = useMeQuery()

  if (!fetching && !data?.me) {
    NextRouter.push("/authentication/login")
  }

  if (!fetching && data?.me) {
    return (
      <Box>
        <Head>
          <title>Settings - KPass</title>
        </Head>
        <Wrapper>
          <Setting />
        </Wrapper>
      </Box>
    )
  }

  return <LoadingPage />
}

export default withUrqlClient(URQLClient)(SettingsPage)
