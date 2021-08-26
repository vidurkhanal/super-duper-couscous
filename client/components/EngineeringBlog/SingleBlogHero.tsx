import {
  Stack,
  Flex,
  Box,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Post } from "../../types";
import { BlogAuthor } from "./Author";

interface IBlogHero {
  postToRender: Post;
}

export const SingleBlogHero: React.FC<IBlogHero> = ({ postToRender }) => {
  return (
    <Flex
      w={"full"}
      h={"60vh"}
      backgroundImage={postToRender.feature_image}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
      clipPath="polygon(0 0, 100% 0, 100% 67%, 54% 93%, 0 100%, 0% 50%)"
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.700, blackAlpha.700)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            {postToRender.title}
          </Text>
          <Text
            color={"white"}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "l", md: "xl" })}
          >
            {postToRender.excerpt}
          </Text>
          <Box>
            <BlogAuthor
              name={postToRender.authors[0].name}
              pfp={postToRender.authors[0].profile_image}
              date={new Date(postToRender.published_at)}
              singlePostVariant={true}
            />
          </Box>
        </Stack>
      </VStack>
    </Flex>
  );
};
