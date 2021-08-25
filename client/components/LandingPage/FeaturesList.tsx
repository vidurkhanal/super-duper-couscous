import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const features = [
  {
    id: 1,
    title: "Log in and go",
    text: "Once you save your passwords with us, you'll have it when you need it; loggin into K Pass is fast and easy.",
  },
  {
    id: 2,
    title: "Generate strong passwords",
    text: "The built-in password generator creates long, randomized passwords that protect against hacking.",
  },
  {
    id: 3,
    title: "Simplify online shopping",
    text: "When you're ready to make a purchase, your profile will fill all your payment and shipping details for you.",
  },
  {
    id: 4,
    title: "Complete trasnparency",
    text: "Here at K Pass, your passwords are completely encypted. Even we have no access to your passwords.",
  },
  {
    id: 5,
    title: "Security against hackers",
    text: "Passwords are only decrypted when they reach your device. Thus, the risk of hackers it reduced.",
  },
  {
    id: 6,
    title: "Everything is free",
    text: "We believe that privacy to be a fundamental right. K Pass will remain free to use for the forceable future.",
  },
];

export const FeaturesList = () => {
  return (
    <Flex
      p={4}
      direction="column"
      alignItems="center"
      justifyContent="center"
      id="featureList"
      minHeight="95vh"
      pt={{ base: "10vh" }}
    >
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>K Pass 12</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          We offer military grade encryption of your passwords. All of the
          passwords are encrypted using RSA and are almost impossible to crack
          given the current state of human technology.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={20}>
          {features.map((feature) => (
            <HStack key={feature.id} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
};
