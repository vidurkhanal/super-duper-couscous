import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";

export const CopyModal: React.FC<{ pass: string; variant: "icon" | "text" }> =
  ({ pass, variant = "text" }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { onCopy } = useClipboard(pass);
    const openFunc = () => {
      onCopy();
      onOpen();
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
          <ModalContent borderRadius="10px">
            <ModalBody p={0}>
              <Flex height="400px">
                <Box flex="1">
                  <Box background="green" p="10px" borderTopLeftRadius="10px">
                    <Text fontWeight="bold">
                      Password Copied Sucessfully!!{" "}
                    </Text>
                  </Box>
                  <Box p="10px">
                    <Text mb="10px">
                      SOME PROMOTIONAL SHIT AND AN CTA TO ASK THEM TO SIGN UP TO
                      OUR SERVICE
                    </Text>
                    <Stack direction="row">
                      <Button colorScheme={"orange"}>CTA Button</Button>
                      <Button colorScheme={"red"} onClick={onClose}>
                        Close
                      </Button>
                    </Stack>
                  </Box>
                </Box>
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
            {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Sign Up Today</Button>
          </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    );
  };
