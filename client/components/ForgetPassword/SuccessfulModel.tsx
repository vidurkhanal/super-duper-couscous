import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { BRAND_COLOR_RED, HOVER_BRAND_COLOR_RED } from "../../constants";

interface ISuccessfulModel {
  email: string;
  isOpen: boolean;
  onOpen: () => void;
}

const SuccessfulModel: React.FC<ISuccessfulModel> = ({
  email,
  isOpen,
  onOpen,
}) => {
  return (
    <>
      <Button
        type="submit"
        bg={BRAND_COLOR_RED}
        color={"white"}
        _hover={{
          bg: HOVER_BRAND_COLOR_RED,
        }}
      >
        Send Password Request Email
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => null}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Password Reset Submitted!!
          </ModalHeader>
          <ModalBody pb={6}>
            <Flex direction="column" alignItems="center">
              <CheckCircleIcon color="green" fontSize="6xl" />
              <Text p="10px" textAlign="center">
                Your Password Request has been succesfully emailed to {email},
                if your email exists with us. Please check your inbox for
                further instructions.
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SuccessfulModel;
