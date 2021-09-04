import React from "react";
import { MobileNav } from "./MobileNav";
import { SidebarContent } from "./SideBarContent";
import {
  Box,
  Flex,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

export const Wrapper: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box overflowX="hidden" minH="100vh">
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
      <MobileNav onOpen={onOpen} />
      <Flex direction="column" ml={{ base: 0, md: 300 }} minWidth="100%" p="4">
        {children}
      </Flex>
    </Box>
  );
};
