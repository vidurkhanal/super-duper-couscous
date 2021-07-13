import {
  Box,
  Container,
  Divider,
  Heading,
  Image,
  Link,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { BlogAuthor } from "../../../components/EngineeringBlog/Author";
import { OtherBlogsBox } from "../../../components/EngineeringBlog/OtherBlogsBox";
import { BlogTags } from "../../../components/EngineeringBlog/Tags";
import { Footer } from "../../../components/LandingPage/Footer";
import { getAllPosts } from "../../../ghost/fetchers";
import { Post } from "../../../types";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";

const index: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const router = useRouter();
  const tagsBuilder = (index: number): String[] => {
    let tags = [];
    posts[index].tags.forEach((tag) => tags.push(tag.name));
    return tags;
  };
  return (
    <Box>
      <Head>
        <title>Supposed Engineering Blog</title>
      </Head>
      <Container maxW={"7xl"} p="12">
        <Heading as="h1">Blogs From Couple Of Tech Nerds</Heading>
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginTop="5%"
            >
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                <NextLink href={`${router.route}/${posts[0].slug}`}>
                  <Image
                    borderRadius="lg"
                    src={posts[0].feature_image}
                    alt="some good alt text"
                    objectFit="contain"
                  />
                </NextLink>
              </Link>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  "radial(orange.600 1px, transparent 1px)",
                  "radial(orange.300 1px, transparent 1px)"
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            {/* // @ts-ignore  */}
            <BlogTags tags={tagsBuilder(0)} />
            <Heading marginTop="1">
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                {posts[0].title}
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              {posts[0].excerpt}
            </Text>
            <BlogAuthor
              name={posts[0].authors[0].name}
              date={new Date(posts[0].published_at)}
              pfp={posts[0].authors[0].profile_image}
            />
          </Box>
        </Box>
        <Heading as="h2" marginTop="5">
          All Other Blogs
        </Heading>
        <Divider marginTop="5" />
        <Wrap spacing="30px" marginTop="5">
          {posts.slice(1, posts.length).map((post) => (
            <OtherBlogsBox key={post.id} postToRender={post} />
          ))}
        </Wrap>
        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading as="h2">What we write about</Heading>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
          </Text>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
          </Text>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
          </Text>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
};
export default index;

export const getStaticProps = async ({ params }) => {
  const posts = await getAllPosts();

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts },
  };
};
