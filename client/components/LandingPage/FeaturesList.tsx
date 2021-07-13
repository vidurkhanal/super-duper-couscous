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

const features = Array.apply(null, Array(9)).map(function (x, i) {
  return {
    id: i,
    title: "Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
  };
});

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
        <Heading fontSize={"3xl"}>Shitty Company Name</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          We offer military grade encryption of your passwords (it's just crypto
          lol).
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
