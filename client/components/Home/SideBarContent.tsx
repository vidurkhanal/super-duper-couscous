import {
  BoxProps,
  Box,
  useColorModeValue,
  Flex,
  CloseButton,
  Image,
  Link,
} from "@chakra-ui/react";
import { FiHome, FiSettings } from "react-icons/fi";
import { NavItem } from "./NavItem";
import { IconType } from "react-icons";
import AddCredModal from "../AddCredential/addCredModal";
import { MODAL_DARK_BACKGROUND } from "../../constants";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Password", icon: FiHome, href: "/passwords" },
  { name: "Settings", icon: FiSettings, href: "/settings" },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      background={useColorModeValue("ffffff", "#000000")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/" _focus={{}}>
          <Image
            src={useColorModeValue(
              "/Kpass-primary.png",
              "/Kpass-secondary.png"
            )}
            loading="eager"
            width={{ base: "75px", lg: "40%" }}
            height="auto"
            alt=""
          />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem link={link.href} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <AddCredModal />
    </Box>
  );
};
