import { ReactText } from "react";
import { IconType } from "react-icons";
import { FlexProps, Link, Flex, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { BRAND_COLOR_RED } from "../../constants";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link: string;
}
export const NavItem = ({ link, icon, children, ...rest }: NavItemProps) => {
  return (
    <NextLink href={link}>
      <Link style={{ textDecoration: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: BRAND_COLOR_RED,
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};
