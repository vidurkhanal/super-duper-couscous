import Head from "next/head";
import { FeaturesList } from "../components/LandingPage/FeaturesList";
import { Footer } from "../components/LandingPage/Footer";
import { MainSection } from "../components/LandingPage/MainSection";
import { NavBar } from "../components/LandingPage/NavBar";
import { PricingComp } from "../components/LandingPage/PricingComp";
import { withUrqlClient } from "next-urql";
import { useMeQuery } from "../generated/graphql";
import { URQLClient } from "../utils/createClient";
import { LoadingPage } from "../components/Misc/LoadingPage";

function Home() {
  const [{ data: MeData, fetching: MeFetching }] = useMeQuery();

  if (!MeFetching)
    return (
      <>
        <Head>
          <title>KPass: The Best Free Password Manager</title>
        </Head>
        <NavBar authState={MeData?.me?.userID} />
        <MainSection />
        <FeaturesList />
        <PricingComp />
        <Footer />
      </>
    );

  return <LoadingPage />;
}

export default withUrqlClient(URQLClient)(Home);
