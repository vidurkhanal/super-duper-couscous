import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { MasterPasswordPopOver } from "../../components/Home/MasterPasswordPopOver";
import { PassObj } from "../../types";

interface IPassword {
  pass: PassObj;
}

export const Password: React.FC<IPassword> = ({ pass }) => {
  const [show, setShow] = useState<boolean>(false);
  const { hasCopied: copyEmail, onCopy: onCopyEmail } = useClipboard(
    pass.username
  );
  const { hasCopied: copyPassword, onCopy: onCopyPassword } = useClipboard(
    pass.password
  );

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
        <Box mb="10px">
          <Text color="darkgray">SITE</Text>
          <Text fontWeight="bold">{pass.site}</Text>
        </Box>
        <Box mb="10px">
          <Text color="darkgray">USERNAME</Text>
          <InputGroup>
            <Input value={pass.username} pr="9rem" readOnly cursor="pointer" />
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
        <Box mb="10px">
          <Text color="darkgray">PASSWORD</Text>
          <InputGroup>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={show ? pass.password : "Nice Try Hot Shot."}
              readOnly
              cursor="not-allowed"
            />
            <InputRightElement width="fit-content" p="10px">
              <Button
                h="1.75rem"
                size="sm"
                outlineColor="transparent"
                _focus={{}}
                _active={{}}
                _hover={{}}
                onClick={() => {
                  if (show) {
                    onCopyPassword();
                  }
                }}
              >
                {show ? (
                  !copyPassword ? (
                    "Copy Password"
                  ) : (
                    "Password Copied"
                  )
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
