import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
interface MasterPasswordPopOverProps {
  passwordUnlockerFn: () => void;
}

export const MasterPasswordPopOver: React.FC<MasterPasswordPopOverProps> = ({
  passwordUnlockerFn,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [masterPIN, setMasterPIN] = useState<null | number>(null);
  const [formErr, setFormErr] = useState<null | string>(null);
  const masterPINChecker = (e) => {
    e.preventDefault();
    if (masterPIN == 1234) {
      passwordUnlockerFn();
      onClose();
    }
  };

  return (
    <>
      <>
        <BsFillEyeFill color="#66ff66" onClick={onOpen} />
      </>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Unlock Your Vault</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="email">
                <FormLabel>Enter Your Master PIN To Open The Vault</FormLabel>
                <Input
                  type="number"
                  autoFocus
                  value={masterPIN}
                  onChange={(e) => setMasterPIN(+e.target.value)}
                />
                <FormHelperText cursor="pointer">
                  Forgot your master PIN !?
                </FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={masterPINChecker}
                type="submit"
              >
                Open
              </Button>
              <Button variant="ghost" onClick={onClose}>
                I Don't Wanna Open Vault
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
