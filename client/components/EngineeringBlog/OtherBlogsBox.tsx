import { Box, Heading, Image, Link, Text, WrapItem } from "@chakra-ui/react";
import { Post } from "../../types";
import { BlogAuthor } from "./Author";
import { BlogTags } from "./Tags";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface IOtherBlogsBox {
  postToRender: Post;
}

export const OtherBlogsBox: React.FC<IOtherBlogsBox> = ({ postToRender }) => {
  const router = useRouter();
  const tagsBuilder = (): String[] => {
    let tags = [];
    postToRender.tags.forEach((tag) => tags.push(tag.name));
    return tags;
  };
  return (
    <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
      <Box w="100%">
        <Box borderRadius="lg" overflow="hidden">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <NextLink href={`${router.route}/${postToRender.slug}`}>
              <Image
                transform="scale(1.0)"
                src={postToRender.feature_image}
                alt="some text"
                objectFit="contain"
                width="100%"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
              />
            </NextLink>
          </Link>
        </Box>
        <BlogTags tags={tagsBuilder()} marginTop="3" />
        <Heading fontSize="xl" marginTop="2">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            {postToRender.title}
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2">
          {postToRender.excerpt}
        </Text>
        <BlogAuthor
          name={postToRender.authors[0].name}
          pfp={postToRender.authors[0].profile_image}
          date={new Date(postToRender.published_at)}
        />
      </Box>
    </WrapItem>
  );
};
