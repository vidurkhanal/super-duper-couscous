import {
  useDisclosure,
  Modal,
  Button,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Text,
  ModalFooter,
} from "@chakra-ui/react";
import { useDeleteCredentialMutation } from "../../generated/graphql";
import { useState } from "react";
import { LoadingModal } from "../LoadingModal";

interface IProps {
  credentialID: string;
}

export const DeleteCredential: React.FC<IProps> = ({ credentialID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, delCredentials] = useDeleteCredentialMutation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await delCredentials({ credentialID });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <>
      <Button width="8rem" colorScheme="blue" onClick={onOpen}>
        Delete
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {!isSubmitting ? (
            <>
              <ModalHeader>Delete Credential</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold" mb="1rem">
                  Are you sure?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={handleSubmit}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          ) : (
            <LoadingModal />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
