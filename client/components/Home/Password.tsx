import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Image,
  useClipboard,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MasterPasswordPopOver } from "../../components/Home/MasterPasswordPopOver";
import { PassObj } from "../../types";
import { decode } from "../../utils/decode";
import { DeleteCredential } from "../DeleteCredential/DeleteModal";

interface IPassword {
  pass: PassObj;
}

const strengthMap = ["BAD", "MEDIUM", "GOOD"];

export const Password: React.FC<IPassword> = ({ pass }) => {
  const [show, setShow] = useState<boolean>(false);

  const { hasCopied: copyEmail, onCopy: onCopyEmail } = useClipboard(
    pass.email
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
      bgColor="indigo.600"
      minHeight="25vh"
      marginY="2rem"
      direction="column"
      alignItems="baseline"
      borderRadius="5px"
      width={{ base: "100%", md: "50%" }}
    >
      <Flex
        // bgColor="transparent"
        bgColor="rgba(180,180,180,0.2)"
        minWidth="100%"
        minHeight="25vh"
        direction="column"
        p="1rem"
        justifyContent="space-between"
        borderRadius="5px"
      >
        <Flex mb="10px" justifyContent="space-between">
          <Box>
            <Text color="darkgray">SITE</Text>
            <Text fontWeight="bold">{pass.siteName}</Text>
          </Box>
          <Image
            src={pass.siteLogo || "sitenull.png"}
            alt=""
            objectFit="cover"
            boxSize="50px"
            borderRadius="5px"
          />
        </Flex>
        <Box mb="10px">
          <Text color="darkgray">USERNAME</Text>
          <InputGroup>
            <Input value={pass.email} pr="9rem" readOnly cursor="pointer" />
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
              value={show ? decode(pass.password) : "Nice Try Hot Shot."}
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
                  <MasterPasswordPopOver
                    passwordUnlockerFn={unlockPassword}
                    variant="open"
                  />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text color="darkgray">SRENGTH</Text>
            <Text pb="0.8rem" fontWeight="bold">
              {strengthMap[pass.strength]}
            </Text>
          </Box>
          <DeleteCredential
            credentialID={pass.credentialID}
            siteName={pass.siteName}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
