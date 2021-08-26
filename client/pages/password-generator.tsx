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
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { NavBar } from "../components/LandingPage/NavBar";
import { CopyModal } from "../components/password-gen/CopyModal";

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [radioValue, setRadioValue] = useState<"1" | "2">("2");
  const [strengthColor, setStrengthColor] = useState<string>("crimson");
  const [boolArr, setBollArr] = useState<boolean[]>([true, true, true, true]);
  const rotateRef = useRef<HTMLButtonElement>(null);

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
        m={{ base: "1rem", lg: "initial" }}
        isChecked={boolArr[arrIndex]}
      >
        <Text textTransform="capitalize" fontSize="xl" color="white">
          {text}
        </Text>
      </Checkbox>
    );
  };

  const genPass = useCallback(() => {
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
  }, [boolArr, length]);

  useEffect(() => {
    const getNumberOfBools = () => {
      let total = 0;
      for (const n of boolArr) if (n) total++;
      return total;
    };

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
  }, [length, boolArr, genPass]);

  useEffect(() => {
    if (radioValue === "2") {
      setBollArr([true, true, true, true]);
    } else {
      setBollArr([true, true, false, false]);
    }
  }, [radioValue]);

  return (
    <Box pb={{ base: "1rem" }}>
      <Head>
        <title>Create A Secure Password - KPass</title>
      </Head>

      <NavBar />
      <main>
        <Flex
          backgroundColor={"#171923"}
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
            <InputGroup width={{ base: "90%", md: "43rem", lg: "55rem" }}>
              <InputRightElement
                my="3rem"
                mx="2rem"
                _hover={{
                  cursor: "pointer",
                }}
              >
                <CopyModal pass={password} variant="icon" />
                <Tooltip label="Generate New" placement="top">
                  <Button
                    ref={rotateRef}
                    background="none"
                    _hover={{}}
                    _focus={{}}
                    transitionDuration="0.5s"
                    onClick={() => {
                      if (rotateRef.current)
                        if (
                          rotateRef.current.style.getPropertyValue(
                            "transform"
                          ) !== "rotate(360deg)"
                        )
                          rotateRef.current.style.transform = "rotate(360deg)";
                        else rotateRef.current.style.transform = "rotate(0deg)";
                    }}
                  >
                    <RepeatIcon w={8} h={8} onClick={genPass} />
                  </Button>
                </Tooltip>
              </InputRightElement>
              <Input
                my="1rem"
                height="6rem"
                paddingRight="6rem"
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
          bgColor="#171923"
          width={{ base: "90%", md: "43rem", lg: "55rem" }}
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
                  w="16rem"
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
              {/* @ts-expect-error */}
              <RadioGroup onChange={setRadioValue} value={radioValue}>
                <Stack direction="column">
                  <Radio colorScheme="green" value="1">
                    <Text color="white">Easy To Red</Text>
                  </Radio>
                  <Radio colorScheme="green" value="2">
                    <Text color="white">All Characters</Text>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box>
              <Flex direction="column" width="100%">
                <Flex direction={{ base: "row", md: "column" }}>
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
      </main>
    </Box>
  );
};

export default PasswordGenerator;
