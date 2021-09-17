/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Text } from "@chakra-ui/layout";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useMeQuery } from "../../generated/graphql";
import { URQLClient } from "../../utils/createClient";
import NextRouter from "next/router";
import Head from "next/head";
import { LoadingPage } from "../../components/Misc/LoadingPage";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  BRAND_COLOR_RED,
  HOVER_BRAND_COLOR_RED,
  MODAL_DARK_BACKGROUND,
} from "../../constants";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const CreateMasterPin: NextPage = () => {
  const [{ data, fetching }] = useMeQuery();
  const [masterPIN, setMasterPIN] = useState("");
  const [reMasterPIN, setReMasterPIN] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    // LOGIC FOR SUBMITTING...
    // I HAVEN'T LINKED THE BACKEND< DO IT IF YOU WANT...
    // I HAVE GENERATED THE GQL FOR YOU THO :)
    let flag = false;
    const arr = masterPIN.split("");

    for (const n of arr) {
      if (n.charCodeAt(0) > 57 || n.charCodeAt(0) < 48) flag = true;
    }

    if (flag) {
      toast({
        title: "Master PIN should be a 4 digit number.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const changeStatesForMasterPIN = (
    e: ChangeEvent<HTMLInputElement>,
    setterFn: Dispatch<SetStateAction<string>>
  ) => {
    // I GOT BORED TO WRITE ASCII CODE FOR MASTER PIN
  };

  if (!fetching && !data?.me) {
    NextRouter.push("/authentication/login");
  }

  if (!fetching && data?.me?.hasMasterPIN) {
    NextRouter.push("/passwords");
  }

  if (!fetching && !data?.me?.hasMasterPIN) {
    return (
      <Box>
        <Head>
          <title>Create Master PIN - KPass</title>
        </Head>
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
          <Flex flex={1} display={{ base: "none", md: "flex" }}>
            <Image
              alt={"Login Image"}
              objectFit={"cover"}
              src={"/create-master-pin.jpeg"}
            />
          </Flex>
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bg={useColorModeValue("gray.100", MODAL_DARK_BACKGROUND)}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Hey, You need to create a Master PIN to access your dashboard.
              </Heading>
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                color={useColorModeValue("gray.800", "gray.400")}
              >
                You can create it right here.
              </Text>
              <form>
                <FormControl mb={5}>
                  <Input
                    placeholder="Enter Your Master PIN"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    required
                    value={masterPIN}
                    onChange={(e) => changeStatesForMasterPIN(e, setMasterPIN)}
                  />
                </FormControl>
                <FormControl mb={5}>
                  <Input
                    placeholder="Re Enter Your Master PIN"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                    required
                    value={reMasterPIN}
                    onChange={(e) =>
                      changeStatesForMasterPIN(e, setReMasterPIN)
                    }
                  />
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    type="submit"
                    bg={BRAND_COLOR_RED}
                    color={"white"}
                    _hover={{
                      bg: HOVER_BRAND_COLOR_RED,
                    }}
                  >
                    Set Master PIN
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Flex>
        </Stack>
      </Box>
    );
  }

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(CreateMasterPin);
