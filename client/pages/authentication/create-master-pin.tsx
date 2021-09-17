/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Text } from "@chakra-ui/layout";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import NextRouter from "next/router";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { LoadingPage } from "../../components/Misc/LoadingPage";
import {
  BRAND_COLOR_RED,
  HOVER_BRAND_COLOR_RED,
  MODAL_DARK_BACKGROUND,
} from "../../constants";
import {
  useCreateMasterPinMutation,
  useMeQuery,
} from "../../generated/graphql";
import { URQLClient } from "../../utils/createClient";
import { useRouter } from "next/router";

const CreateMasterPin: NextPage = () => {
  const [{ data, fetching }] = useMeQuery();
  const [masterPIN, setMasterPIN] = useState("");
  const [reMasterPIN, setReMasterPIN] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, createMasterPIN] = useCreateMasterPinMutation();
  const toast = useToast();
  const router = useRouter();

  const formResetter = () => {
    setMasterPIN("");
    setReMasterPIN("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (masterPIN !== reMasterPIN) {
      return toast({
        title: "Your PINs don't match. Please enter the same PIN.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
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

    const { data, error } = await createMasterPIN({ masterPIN });
    if (error) {
      toast({
        title: error.message,
        status: "error",
      });
    }

    if (data?.createMasterPIN.error) {
      toast({
        title: data.createMasterPIN.error,
        status: "error",
      });
      setIsSubmitting(false);
    }

    if (data?.createMasterPIN.isSuccessful) {
      toast({
        title: "Master PIN set.",
        description: "Redirecting you to your dashboard.",
        status: "success",
        isClosable: true,
        duration: 5000,
      });
      formResetter();
      setIsSubmitting(false);
      return setTimeout(() => {
        router.reload();
      }, 5000);
    }
  };

  const changeStatesForMasterPIN = (
    e: ChangeEvent<HTMLInputElement>,
    setterFn: Dispatch<SetStateAction<string>>
  ) => {
    setterFn(e.target.value);
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
          <Flex
            p={8}
            flex={1}
            align={"center"}
            justify={"center"}
            bg={{
              base: "linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.85)),url('/create-master-pin.jpeg')",
              md: "none",
            }}
          >
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
                You can create it right here. Enter your 4 character PIN.
              </Text>
              <form onSubmit={handleSubmit}>
                <FormControl mb={5}>
                  <Input
                    placeholder="Enter Your Master PIN"
                    _placeholder={{ color: "gray.500" }}
                    type="password"
                    required
                    value={masterPIN}
                    name="Master PIN"
                    maxLength={4}
                    onChange={(e) => changeStatesForMasterPIN(e, setMasterPIN)}
                  />
                </FormControl>
                <FormControl mb={5}>
                  <Input
                    placeholder="Re Enter Your Master PIN"
                    _placeholder={{ color: "gray.500" }}
                    type="password"
                    required
                    maxLength={4}
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
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
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
