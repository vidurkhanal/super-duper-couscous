import { RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { NavBar } from "../components/LandingPage/NavBar";
import { CopyModal } from "../components/password-gen/CopyModal";

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [radioValue, setRadioValue] = useState<"1" | "2">("2");
  const [strengthColor, setStrengthColor] = useState<string>("crimson");
  const [boolArr, setBollArr] = useState<boolean[]>([true, true, true, true]);

  const getNumberOfBools = () => {
    let total = 0;
    for (let i = 0; i < boolArr.length; i++) {
      if (boolArr[i]) {
        total++;
      }
    }
    return total;
  };

  const genPass = () => {
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*_-+=";

    let n = length;
    let pass = "";
    let characters = "";

    characters += boolArr[0] ? upperCase : "";
    characters += boolArr[1] ? lowerCase : "";
    characters += boolArr[2] ? numbers : "";
    characters += boolArr[3] ? symbols : "";

    while (n > 0) {
      pass += characters.charAt(Math.floor(Math.random() * characters.length));
      n--;
    }
    setPassword(pass);
  };

  const CustomCheckBox: React.FC<{ arrIndex: 0 | 1 | 2 | 3; text: string }> = ({
    text,
    arrIndex,
  }) => {
    return (
      <Checkbox
        colorScheme="green"
        onChange={() => {
          boolArr[arrIndex] = !boolArr[arrIndex];
          setBollArr([...boolArr]);
        }}
        defaultIsChecked
        size="lg"
        py="5px"
        m={{ sm: "10px", lg: "initial" }}
        isChecked={boolArr[arrIndex]}
      >
        <Text textTransform="capitalize" fontSize="xl" color="white">
          {text}
        </Text>
      </Checkbox>
    );
  };

  useEffect(() => {
    genPass();
    const numOfBools = getNumberOfBools();
    if (numOfBools === 4) {
      setStrengthColor("green");
    } else if (numOfBools === 3) {
      setStrengthColor("lightgreen");
    } else if (numOfBools === 2) {
      setStrengthColor("crimson");
    } else {
      setStrengthColor("red");
    }
  }, [length, boolArr]);

  useEffect(() => {
    if (radioValue === "2") {
      setBollArr([true, true, true, true]);
    } else {
      setBollArr([true, true, false, false]);
    }
  }, [radioValue]);

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
            <InputGroup width={{ base: "95%", lg: "60%" }}>
              <InputRightElement
                my="3rem"
                mx="2rem"
                _hover={{
                  cursor: "pointer",
                }}
              >
                <CopyModal pass={password} variant="icon" />
                <Tooltip label="Generate New" placement="top">
                  <RepeatIcon w={8} h={8} onClick={genPass} />
                </Tooltip>
              </InputRightElement>
              <Input
                my="1rem"
                height="6rem"
                paddingRight="4.5rem"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fontSize={{ base: "1.5rem", md: "2rem" }}
                borderBottom={`0.6rem solid ${strengthColor}`}
                _hover={{}}
                _focus={{}}
              />
            </InputGroup>
          </Flex>
        </Flex>
        <Box
          bgColor="#293A52"
          width={{ base: "95%", lg: "60%" }}
          mx="auto"
          borderRadius="5px"
          padding={{ base: "1rem 2rem", lg: "1rem 5rem" }}
        >
          <Text fontWeight="bold" fontSize="3xl" color="white">
            Customize Your Password
          </Text>
          <Divider height="10px" mb="10px" />
          <Flex
            direction={{ base: "column", lg: "row" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex direction="column" alignItems="center">
              <Text fontWeight="light" fontSize="l" color="white">
                Choose The Length Of Your Password
              </Text>
              <Flex py="1rem" alignItems="center" direction="row">
                <Input
                  width="3.5rem"
                  mx="1rem"
                  mb="0.6rem"
                  value={length}
                  type="number"
                  color="white"
                  min={8}
                  max={32}
                  onChange={(e) => setLength(+e.target.value)}
                />
                <Slider
                  aria-label="slider-ex-2"
                  w="17rem"
                  min={8}
                  max={32}
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
            </Flex>
            <Box>
              {/*
 // @ts-ignore */}
              <RadioGroup onChange={setRadioValue} value={radioValue}>
                <Stack direction="column">
                  <Radio value="1">Easy To Red</Radio>
                  <Radio value="2">All Characters</Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box px="20px">
              <Flex direction="column" width="100%">
                <Flex
                  direction={{ base: "row", md: "column" }}
                  justifyContent="space-between"
                >
                  <CustomCheckBox arrIndex={0} text="Uppercase" />
                  <CustomCheckBox arrIndex={1} text="Lowercase" />
                </Flex>
                <Flex direction={{ base: "row", md: "column" }}>
                  <CustomCheckBox arrIndex={2} text="numbers" />
                  <CustomCheckBox arrIndex={3} text="symbols" />
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box width={{ base: "95%", lg: "60%" }} mx="auto" mt="10px">
          <CopyModal variant="text" pass={password} />
        </Box>
      </main>
    </Box>
  );
};

export default PasswordGenerator;
