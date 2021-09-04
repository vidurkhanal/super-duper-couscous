import {
  FlexProps,
  useColorModeValue,
  Flex,
  IconButton,
  Text,
  HStack,
  Menu,
  MenuButton,
  VStack,
  MenuItem,
  Box,
  MenuList,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import NextRouter from "next/router";
import { useLogoutUserMutation, useMeQuery } from "../../generated/graphql";
import NextLink from "next/link";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [{ data }] = useMeQuery();
  const [, logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    await logoutUser();
    NextRouter.reload();
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      // bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
      position="sticky"
      top="0"
      zIndex="100"
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        src={useColorModeValue("/Kpass-primary.png", "/Kpass-secondary.png")}
        loading="eager"
        width="70px"
        height="auto"
        alt="Brand Secondary Logo"
        display={{ base: "initial", md: "none" }}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="md" fontWeight="bold">
                    {data?.me?.fullName}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>
                <NextLink href="/profile">Profile</NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/settings">Settings</NextLink>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
