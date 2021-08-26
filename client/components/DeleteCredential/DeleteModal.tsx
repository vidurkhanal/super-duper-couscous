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
import { MasterPasswordPopOver } from "../Home/MasterPasswordPopOver";

interface IProps {
  credentialID: string;
  siteName: string;
}

export const DeleteCredential: React.FC<IProps> = ({
  credentialID,
  siteName,
}) => {
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
      <Button width="8rem" variant="outline" colorScheme="red" onClick={onOpen}>
        Delete
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {!isSubmitting ? (
            <>
              <ModalHeader>Delete {siteName} from your vault ? </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold" mb="1rem">
                  Are you sure?
                </Text>
                <Text>
                  Remember the deletion is permanent. You might need to enter
                  your Master PIN to complete your changes.
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <MasterPasswordPopOver
                  passwordUnlockerFn={handleSubmit}
                  variant="delete"
                />
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
