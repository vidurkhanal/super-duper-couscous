import Head from "next/head"
import { NavBar } from "../components/LandingPage/NavBar"
import { MainSection } from "../components/LandingPage/MainSection"
import { FeaturesList } from "../components/LandingPage/FeaturesList"
import { Footer } from "../components/LandingPage/Footer"
import { PricingComp } from "../components/LandingPage/PricingComp"

export default function Home() {
  return (
    <>
      <Head>
        <title> Pass Manager</title>
      </Head>
      <NavBar />
      <MainSection />
      <FeaturesList />
      <PricingComp />
      <Footer />
    </>
  )
}
