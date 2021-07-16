import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  useClipboard,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { PassObj } from "../../types";
import { MasterPasswordPopOver } from "../../components/Home/MasterPasswordPopOver";

interface IPassword {
  pass: PassObj;
}

export const Password: React.FC<IPassword> = ({ pass }) => {
  const [show, setShow] = useState<boolean>(false);
  const { hasCopied: copyEmail, onCopy: onCopyEmail } = useClipboard(
    pass.username
  );

  // const pass: PassObj = {
  //   site: "apple.money.com",
  //   username: "hello@123.co",
  //   password: "password123",
  //   strength: "GOOD",
  // };

  const unlockPassword = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [show]);

  return (
    <Flex
      bgColor="rgba(180,180,180,0.2)"
      minHeight="25vh"
      mb="2rem"
      direction="column"
      alignItems="baseline"
      borderRadius="5px"
      width={{ sm: "100%", md: "90%", lg: "60%" }}
      marginLeft={{ base: "0", md: "20px" }}
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
        <Box>
          <Text color="darkgray">SITE</Text>
          <Text fontWeight="bold">{pass.site}</Text>
        </Box>
        <Box>
          <Text color="darkgray">USERNAME</Text>
          <InputGroup>
            <Input value={pass.username} readOnly cursor="pointer" />
            <InputRightElement width="fit-content" p="10px">
              <Button
                size="sm"
                outlineColor="transparent"
                _focus={{}}
                _active={{}}
                _hover={{}}
                onClick={onCopyEmail}
              >
                {!copyEmail ? "Copy Username" : "Username Copied"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box>
          <Text color="darkgray">PASSWORD</Text>
          <InputGroup>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={show ? pass.password : "Nice Try Hot Shot."}
              readOnly
              cursor="not-allowed"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                outlineColor="transparent"
                _focus={{}}
                _active={{}}
                _hover={{}}
              >
                {show ? (
                  <BsFillEyeSlashFill
                    color="#ff5050"
                    onClick={unlockPassword}
                  />
                ) : (
                  <MasterPasswordPopOver passwordUnlockerFn={unlockPassword} />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Text color="darkgray">SRENGTH</Text>
        <Text fontWeight="bold">{pass.strength}</Text>
      </Flex>
    </Flex>
  );
};
