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
import React, { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
interface MasterPasswordPopOverProps {
  passwordUnlockerFn: () => void;
  variant: "delete" | "open";
}

export const MasterPasswordPopOver: React.FC<MasterPasswordPopOverProps> = ({
  passwordUnlockerFn,
  variant = "open",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [masterPIN, setMasterPIN] = useState<"" | string>("");
  const [formErr, setFormErr] = useState<null | string>(null);
  const masterPINChecker = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPIN === "1234") {
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
        {variant === "open" ? (
          <BsFillEyeFill color="#66ff66" onClick={onOpen} />
        ) : (
          <Button colorScheme="red" onClick={onOpen}>
            Delete
          </Button>
        )}
      </>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setMasterPIN("");
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
                <FormLabel>Enter Your Master PIN</FormLabel>
                <Input
                  autoFocus
                  inputMode="numeric"
                  value={masterPIN}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setMasterPIN(e.target.value);
                    const foo = e.target.value;
                    if (foo.length > 8) {
                      setMasterPIN("");
                      setFormErr(
                        "Master PIN too long. Please enter carefully."
                      );
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
                {variant === "delete" ? "Delete" : "Open"}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                <span>I Do not Wanna</span>{" "}
                {variant === "delete" ? "Delete" : "Open Vault"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
