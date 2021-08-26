import React from "react";
import { MobileNav } from "./MobileNav";
import { SidebarContent } from "./SideBarContent";
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

export const Wrapper: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      overflowX="hidden"
      minH="100vh"
      // bg={useColorModeValue("gray.100", "gray.900")}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Flex
        direction="column"
        //justifyContent="center"
        //alignItems="center"
        ml={{ base: 0, md: 300 }}
        minWidth="100%"
        p="4"
      >
        {children}
      </Flex>
    </Box>
  );
};
