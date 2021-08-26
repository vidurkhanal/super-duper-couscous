import { ModalBody, Box, Spinner, Text } from "@chakra-ui/react";

export const LoadingModal = () => {
  return (
    <>
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
    </>
  );
};
