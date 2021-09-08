import { useRouter } from "next/router";
import { useEffect } from "react";
import { __PROD__ } from "../constants";

const VerifyEmail: React.FC = ({}) => {
  const router = useRouter();

  useEffect(() => {
    const url = __PROD__
      ? "https://api.kpass12.ninja/confirm-email/"
      : "http://localhost:8080/confirm-email/";
    const verifier = async (id: string) => {
      const res = await fetch(`${url}${id}`);
      const data = await res.json();
      const { isVerified } = data;
    };
    if (router?.query?.verifyid) {
      verifier(router?.query?.verifyid as string);
    }
  }, [router]);
  return <>Hello From Verify Email</>;
};
export default VerifyEmail;
