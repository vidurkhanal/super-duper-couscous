import { SingleBlogHero } from "../../../components/EngineeringBlog/SingleBlogHero";
import { Box } from "@chakra-ui/react";
import { getAllPosts, getSinglePost } from "../../../ghost/fetchers";
import Head from "next/head";
import { Post } from "../../../types";
import { NavBar } from "../../../components/LandingPage/NavBar";
import { withUrqlClient } from "next-urql";
import { useMeQuery } from "../../../generated/graphql";
import { URQLClient } from "../../../utils/createClient";
import { LoadingPage } from "../../../components/LoadingPage";

interface ISinglePage {
  postToRender: Post;
}

const SinglePage: React.FC<ISinglePage> = ({ postToRender }) => {
  const [{ data: MeData, fetching: MeFetching }] = useMeQuery();

  if (!MeFetching)
    return (
      <Box>
        <Head>
          <title>{postToRender.title}</title>
        </Head>
        <NavBar authState={MeData?.me?.userID} />
        <SingleBlogHero postToRender={postToRender} />
      </Box>
    );
  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(SinglePage);

export async function getStaticPaths() {
  const posts = await getAllPosts();
  //@ts-expect-error
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
  const post = await getSinglePost(context.params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postToRender: post },
  };
}
