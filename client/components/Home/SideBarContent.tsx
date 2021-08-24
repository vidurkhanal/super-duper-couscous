import {
  BoxProps,
  Box,
  useColorModeValue,
  Flex,
  Text,
  CloseButton,
  Image,
} from "@chakra-ui/react";
import { FiHome, FiSettings } from "react-icons/fi";
import { NavItem } from "./NavItem";
import { IconType } from "react-icons";
import AddCredModal from "../AddCredential/addCredModal";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Password", icon: FiHome },
  { name: "Settings", icon: FiSettings },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src={useColorModeValue("/Kpass-primary.png", "/Kpass-secondary.png")}
          loading="eager"
          width={{ base: "75px", lg: "40%" }}
          height="auto"
          alt=""
        />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <AddCredModal />
    </Box>
  );
};
