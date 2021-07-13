import { SingleBlogHero } from "../../../components/EngineeringBlog/SingleBlogHero";
import { Box } from "@chakra-ui/react";
import { getAllPosts, getSinglePost } from "../../../ghost/fetchers";
import Head from "next/head";
import { Post } from "../../../types";

interface ISinglePage {
  postToRender: Post;
}

const SinglePage: React.FC<ISinglePage> = ({ postToRender }) => {
  return (
    <Box>
      <Head>
        <title>{postToRender.title}</title>
      </Head>
      <SingleBlogHero postToRender={postToRender} />
    </Box>
  );
};

export default SinglePage;

export async function getStaticPaths() {
  const posts = await getAllPosts();
  //@ts-ignore
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
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
