import React, { useEffect, useState } from "react"
import {
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Stack,
  Checkbox,
  useClipboard,
  Tooltip,
  useToast,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { CopyIcon } from "@chakra-ui/icons"
import Head from "next/head"
import { NavBar } from "../components/LandingPage/NavBar"

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>("")
  const [length, setLength] = useState<number>(12)
  const { hasCopied, onCopy } = useClipboard(password)
  const [boolArr, setBollArr] = useState<boolean[]>([true, true, true, true])
  const toast = useToast()

  const genPass = () => {
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerCase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*_-+="

    let n = length
    let pass = ""
    let characters = ""

    characters += boolArr[0] ? upperCase : ""
    characters += boolArr[1] ? lowerCase : ""
    characters += boolArr[2] ? numbers : ""
    characters += boolArr[3] ? symbols : ""

    while (n > 0) {
      pass += characters.charAt(Math.floor(Math.random() * characters.length))
      n--
    }

    setPassword(pass)
  }

  useEffect(() => {
    genPass()
  }, [length, boolArr])

  if (hasCopied)
    toast({
      title: "Copied to clipboard",
      duration: 1000,
      position: "top",
      status: "success",
      isClosable: true,
    })

  return (
    <Box>
      <Head>
        <title>Create A Secure Password</title>
      </Head>
      <NavBar />
      <main>
        <Flex
          backgroundColor={"#293A52"}
          alignItems="center"
          justifyContent="center"
          py="0.6rem"
        >
          <Flex alignItems="center" direction={{ base: "column", md: "row" }}>
            <Text
              fontWeight="bold"
              fontSize="2xl"
              textAlign="center"
              my="15px"
              paddingRight="20px"
              color="white"
            >
              SECURED PASSWORD MANAGER FOR FREE
            </Text>
            <Button colorScheme="orange">Sign Up Today.</Button>
          </Flex>
        </Flex>
        <Flex marginX="auto" mt={{ base: "0.5rem", md: "2rem" }}>
          <Flex flexDirection="column" placeItems="center" minWidth="100%">
            <Text
              textAlign="center"
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="3xl"
            >
              Generate A Secure Password
            </Text>
            <Text
              textTransform="uppercase"
              textAlign="center"
              fontSize="sm"
              mt="5px"
            >
              Create A Secure Password By Using This Free [App Name] Password
              Generator Tool
            </Text>
            <InputGroup width={{ base: "95%", md: "70%" }}>
              <InputRightElement
                my="3rem"
                mx="2rem"
                _hover={{
                  cursor: "pointer",
                }}
              >
                <Tooltip label="Copy" placement="top">
                  <CopyIcon w={8} h={8} onClick={onCopy} />
                </Tooltip>
              </InputRightElement>
              <Input
                my="1rem"
                height="6rem"
                paddingRight="4.5rem"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fontSize={{ base: "1.5rem", md: "2rem" }}
                borderBottom="0.6rem solid"
                _hover={{}}
                _focus={{}}
              />
            </InputGroup>
          </Flex>
        </Flex>
        <Flex
          bgColor="#293A52"
          direction="column"
          borderRadius="5px"
          alignItems="center"
          mx="auto"
          justifyContent="center"
          width={{ base: "95%", md: "70%" }}
          padding="1rem 2rem"
        >
          <Text fontWeight="bold" fontSize="2xl">
            Customize your password
          </Text>
          <Flex
            py="1rem"
            alignItems="center"
            direction={{ base: "column", md: "row" }}
          >
            <Input
              width="3.5rem"
              mx="1rem"
              mb="0.6rem"
              value={length}
              onChange={(e) => setLength(+e.target.value)}
            />
            <Slider
              aria-label="slider-ex-2"
              w="20rem"
              min={8}
              max={50}
              value={length}
              onChange={(e) => setLength(e)}
              colorScheme="purple"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Flex>
          <Stack
            spacing={{ base: 5, md: 10 }}
            direction={{ base: "column", md: "row" }}
          >
            <Stack spacing="10" direction={"row"}>
              <Checkbox
                colorScheme="green"
                onChange={() => {
                  boolArr[0] = !boolArr[0]
                  setBollArr([...boolArr])
                }}
                defaultIsChecked
              >
                Uppercase
              </Checkbox>
              <Checkbox
                colorScheme="green"
                onChange={() => {
                  boolArr[1] = !boolArr[1]
                  setBollArr([...boolArr])
                }}
                defaultIsChecked
              >
                Lowercase
              </Checkbox>
            </Stack>
            <Stack spacing={{ base: 12, md: 10 }} direction={"row"}>
              <Checkbox
                colorScheme="green"
                onChange={() => {
                  boolArr[2] = !boolArr[2]
                  setBollArr([...boolArr])
                }}
                defaultIsChecked
              >
                Numbers
              </Checkbox>
              <Checkbox
                colorScheme="green"
                onChange={() => {
                  boolArr[3] = !boolArr[3]
                  setBollArr([...boolArr])
                }}
                defaultIsChecked
              >
                Symbols
              </Checkbox>
            </Stack>
          </Stack>
        </Flex>
      </main>
    </Box>
  )
}
export default PasswordGenerator
