import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useToast,
  Tooltip,
  useClipboard,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MODAL_DARK_BACKGROUND,
  BRAND_COLOR_RED,
  HOVER_BRAND_COLOR_RED,
} from "../../constants";

interface IProps {
  pass: string;
  variant: "icon" | "text";
  authState: string | undefined;
}

export const CopyModal: React.FC<IProps> = ({
  pass,
  authState,
  variant = "text",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy } = useClipboard(pass);
  const toast = useToast();
  const openFunc = () => {
    if (authState) {
      toast({
        title: "Copied Sucessfully",
        status: "success",
        isClosable: true,
        duration: 5000,
      });
    } else {
      onCopy();
      onOpen();
    }
  };
  return (
    <>
      {variant === "text" ? (
        <Button onClick={openFunc}>Copy Password</Button>
      ) : (
        <Button
          onClick={openFunc}
          background="transparent"
          _hover={{}}
          _focus={{}}
          _active={{}}
          outlineColor="transparent"
          outline="none"
        >
          <Tooltip label="Copy" placement="top">
            <CopyIcon w={8} h={8} mr="10px" />
          </Tooltip>
        </Button>
      )}
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="10px"
          background={useColorModeValue("gray.200", MODAL_DARK_BACKGROUND)}
        >
          <ModalBody p={0}>
            <Flex height="400px">
              <Flex flex="1" direction="column">
                <Box background="green" p="10px" borderTopLeftRadius="10px">
                  <Text fontWeight="bold">Password Copied Sucessfully!!</Text>
                </Box>
                <Flex p="10px" direction="column">
                  <Text mb="10px">
                    Find some time to join us.And other bullshit that you ll
                    have to write
                  </Text>
                  <Stack direction="row">
                    <Link
                      href="/authentication/register"
                      _focus={{}}
                      _hover={{
                        textDecoration: "none",
                      }}
                    >
                      <Button
                        background={BRAND_COLOR_RED}
                        _hover={{
                          background: HOVER_BRAND_COLOR_RED,
                        }}
                        variant={"solid"}
                      >
                        Register
                      </Button>
                    </Link>
                    <Button variant={"ghost"} onClick={onClose}>
                      Close
                    </Button>
                  </Stack>
                </Flex>
              </Flex>
              <Box
                backgroundImage="https://images.theconversation.com/files/186076/original/file-20170914-8971-1bvg0di.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
                backgroundPosition="center"
                backgroundSize="contain"
                height="400px"
                flex="1"
                borderTopRightRadius="10px"
                borderBottomRightRadius="10px"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
