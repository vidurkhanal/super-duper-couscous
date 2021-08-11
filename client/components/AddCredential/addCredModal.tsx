import {
  Button,
  FormControl,
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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAddCredentialMutation } from "../../generated/graphql";

type IForm = {
  siteName: string;
  email: string;
  password: string;
};

const AddCredModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [, addCredentials] = useAddCredentialMutation();

  const [form, setForm] = useState<IForm>({
    siteName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //@ts-expect-error
    form[name] = value;
    setForm({ ...form });
  };

  const handleSubmit = async () => {
    const { data, error } = await addCredentials(form);
    if (error) {
      toast({
        title: error.message,
        status: "error",
      });
    } else if (data?.addCredential.error) {
      toast({
        title: data.addCredential.error,
        status: "error",
      });
    } else {
      toast({
        title: "Logged In Succesfully...Redirecting to home page",
        status: "success",
      });
    }
  };

  return (
    <>
      <Button
        mt={1}
        ml={"6"}
        onClick={onOpen}
        variant="solid"
        colorScheme="blue"
      >
        Add Credentials
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a website</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl id="siteName" name="siteName">
              <FormLabel>Site</FormLabel>
              <Input
                name="siteName"
                placeholder="Site name"
                value={form.siteName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl my={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                placeholder="First name"
                value={form.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                placeholder="Last name"
                value={form.password}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCredModal;
