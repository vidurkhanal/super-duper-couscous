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
import { useRouter } from "next/router";
import { NavBar } from "../../../components/LandingPage/NavBar";
import { withUrqlClient } from "next-urql";
import { useMeQuery } from "../../../generated/graphql";
import { URQLClient } from "../../../utils/createClient";
import { LoadingPage } from "../../../components/Misc/LoadingPage";

const Index: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const router = useRouter();
  const path = router.route;

  const tagsBuilder = (i: number): string[] => {
    let tags: string[] = [];
    posts[i].tags.forEach((tag) => tags.push(tag.name));
    return tags;
  };

  const bg = useColorModeValue(
    "radial(orange.600 1px, transparent 1px)",
    "radial(orange.300 1px, transparent 1px)"
  );

  const color = useColorModeValue("gray.700", "gray.200");

  const [{ data: MeData, fetching: MeFetching }] = useMeQuery();

  if (!MeFetching)
    return (
      <Box>
        <NavBar authState={MeData?.me?.userID} />
        <Head>
          <title>Supposed Engineering Blog</title>
        </Head>
        <Container maxW={"7xl"} p="12">
          <Heading as="h1">Blogs From Couple Of Tech Nerds</Heading>
          {/* <Box
            marginTop={{ base: "1", md: "5" }}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              zIndex="-1"
              alignItems="center"
            >
              <Box
                width={{ base: "100%", sm: "85%" }}
                zIndex="2"
                marginLeft={{ base: "0", sm: "5%" }}
                marginTop="5%"
              >
                <Image
                  borderRadius="lg"
                  src={posts[0].feature_image}
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Box>
              <Box zIndex="1" width="100%" position="absolute" height="100%">
                <Box
                  bgGradient={bg}
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
              <BlogTags tags={tagsBuilder(0)} />
              <Heading marginTop="1">
                <Link
                  _hover={{
                    textDecoration: "none",
                  }}
                  _active={{}}
                  _focus={{}}
                  href={`${path}/${posts[0].slug}`}
                >
                  {posts[0].title}
                </Link>
              </Heading>
              <Text as="p" marginTop="2" color={color} fontSize="lg">
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
              We post stupid shit for the moment. Think of better shit to write
              here later.
            </Text>
          </VStack> */}
        </Container>
        <Footer />
      </Box>
    );
  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(Index);

export const getStaticProps = async ({ params }: any) => {
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
