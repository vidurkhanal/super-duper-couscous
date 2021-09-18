import { Flex, Avatar, Text } from "@chakra-ui/react";
import { NavBar } from "../components/LandingPage/NavBar";
import { withUrqlClient } from "next-urql";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";
import { LoadingPage } from "../components/Misc/LoadingPage";
import { nanoid } from "nanoid";
import { NextPage } from "next";

interface Founders {
  name: string;
  post: string;
  companyStatus: string;
  excerpt: string;
  src: string;
}

const Card: NextPage<Founders> = ({
  name,
  companyStatus,
  src,
  post,
  excerpt,
}) => {
  return (
    <Flex
      width={{ base: "100vw", md: "50vw" }}
      my={{ base: "1rem", md: "0" }}
      alignItems="center"
      direction="column"
      p="2rem 3rem"
    >
      <Text fontWeight="bold">{name}</Text>
      <Text>
        {companyStatus}, <span style={{ fontWeight: "bold" }}>{post}</span>
      </Text>
      <Avatar my="2rem" size="2xl" name="Sangit Manandhar" src={src} />
      <Text textAlign="justify">{excerpt}</Text>
    </Flex>
  );
};

const FoundersArr: Founders[] = [
  {
    name: "Vidur Khanal",
    post: "CEO",
    companyStatus: "Co-Founder",
    excerpt:
      "..........HE IS DOING NOTHING...... is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    src: "sitenull.png",
  },
  {
    name: "Sangit Manandhar",
    post: "CTO",
    companyStatus: "Co-Founder",
    excerpt:
      "-----------------HE IS CARRYING THE PROJECT ON HIS HANDS ------------is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    src: "sitenull.png",
  },
];

const AboutUs = () => {
  const [{ data: MeData, fetching: MeFetching }] = useMeQuery();
  if (!MeFetching)
    return (
      <Flex minH="100vh" width="100vw" direction="column">
        <NavBar authState={MeData?.me?.userID} />
        <Flex direction={{ base: "column", md: "row" }} alignItems="center">
          {FoundersArr.map((item) => (
            <Card key={nanoid()} {...item} />
          ))}
        </Flex>
      </Flex>
    );

  return <LoadingPage />;
};

export default withUrqlClient(URQLClient)(AboutUs);
