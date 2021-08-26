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
import { BRAND_COLOR_RED, HOVER_BRAND_COLOR_RED } from "../../constants";
import { useAddCredentialMutation } from "../../generated/graphql";
import { LoadingModal } from "../LoadingModal";

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
      setForm({
        siteName: "",
        email: "",
        password: "",
      });
      onClose();
    }
  };

  return (
    <>
      <Button
        mt={1}
        ml={"6"}
        onClick={onOpen}
        variant="outline"
        borderColor={BRAND_COLOR_RED}
        color={BRAND_COLOR_RED}
        _hover={{
          background: HOVER_BRAND_COLOR_RED,
          color: "white",
        }}
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
                      placeholder="website.com"
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
              <LoadingModal />
            )}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCredModal;
