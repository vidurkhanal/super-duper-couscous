import { Flex } from "@chakra-ui/react"
import { ChangeMasterPIN } from "./ChangeMasterPin"
import { ChangePassword } from "./ChangePassword"

export const Setting: React.FC = () => {
  return (
    <>
      <Flex direction="column" width={{ base: "90vw", md: "60vw" }}>
        <ChangePassword />
        <ChangeMasterPIN />
      </Flex>
    </>
  )
}
