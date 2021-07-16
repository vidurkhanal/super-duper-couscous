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
  FormErrorMessage,
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
  const [masterPIN, setMasterPIN] = useState<"" | number>(null);
  const [formErr, setFormErr] = useState<null | string>(null);
  const masterPINChecker = (e) => {
    e.preventDefault();
    if (masterPIN === 1234) {
      passwordUnlockerFn();
      onClose();
    } else {
      setFormErr("You Entered The Wrong Master PIN, Try Again!!");
      setMasterPIN("");
    }
  };

  return (
    <>
      <>
        <BsFillEyeFill color="#66ff66" onClick={onOpen} />
      </>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setMasterPIN(null);
          setFormErr(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Unlock Your Vault</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="email" isInvalid={!!formErr}>
                <FormLabel>Enter Your Master PIN To Open The Vault</FormLabel>
                <Input
                  autoFocus
                  inputMode="numeric"
                  value={masterPIN}
                  onChange={(e) => {
                    const foo = e.target.value;
                    if (foo.length > 8) {
                      setMasterPIN("");
                      setFormErr(
                        "Master PIN too long. Please enter carefully."
                      );
                      return;
                    } else {
                      const foo_asc = foo.charCodeAt(foo.length - 1);
                      if (foo_asc >= 48 && foo_asc <= 57) {
                        setMasterPIN(+foo);
                      }
                    }
                  }}
                />
                {formErr && <FormErrorMessage>{formErr}</FormErrorMessage>}
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
