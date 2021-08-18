import {
  Box,
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
  Spinner,
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { data, error } = await addCredentials(form);
    if (data || error) {
      setIsSubmitting(false);
    }
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
        title: "Credential Added Successfully...",
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
          <form onSubmit={handleSubmit}>
            {!isSubmitting && (
              <>
                <ModalHeader>Add a new site to your vault</ModalHeader>
                <ModalCloseButton />
              </>
            )}

            {!isSubmitting ? (
              <>
                <ModalBody pb={6}>
                  <FormControl id="siteName" name="siteName">
                    <FormLabel>Site Name</FormLabel>
                    <Input
                      name="siteName"
                      placeholder="https://mywebsite.com"
                      value={form.siteName}
                      onChange={handleChange}
                      required={true}
                    />
                  </FormControl>

                  <FormControl my={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      placeholder="james@potter.com"
                      value={form.email}
                      onChange={handleChange}
                      required={true}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      placeholder="************"
                      value={form.password}
                      onChange={handleChange}
                      required={true}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </>
            ) : (
              <ModalBody p={6}>
                <Box
                  minH="200px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <>
                    <Spinner size="xl" mb="10px" />
                    <Text>Securely adding your site to the vault</Text>
                  </>
                </Box>
              </ModalBody>
            )}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCredModal;
