import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

type PassObj = {
  username: string;
  password: string;
  strength: string;
};

export const Password = () => {
  const [show, setShow] = useState<boolean>(false);
  const pass: PassObj = {
    username: "apple.money.com",
    password: "password123",
    strength: "GOOD",
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <Flex
      bgColor="rgba(180,180,180,0.2)"
      minHeight="25vh"
      mb="2rem"
      direction="column"
      alignItems="baseline"
      borderRadius="5px"
    >
      <Text p="1rem" fontSize="20px" fontWeight="bold" mr="1rem">
        LOGO Title
      </Text>
      <Flex
        bgColor="rgba(180,180,180,0.2)"
        minWidth="100%"
        minHeight="25vh"
        direction="column"
        p="1rem"
        justifyContent="space-between"
        borderRadius="5px"
      >
        <Text color="darkgray">USERNAME</Text>
        <Text fontWeight="bold">{pass.username}</Text>
        <Text color="darkgray">PASSWORD</Text>
        <InputGroup>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            value={pass.password}
            readOnly
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text color="darkgray">SRENGTH</Text>
        <Text fontWeight="bold">{pass.strength}</Text>
      </Flex>
    </Flex>
  );
};
