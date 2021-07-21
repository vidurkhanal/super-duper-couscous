import bigInt from "big-integer";
import { PRIVATE_KEY, PUBLIC_KEY } from "../constants";

export const decode = (encodedPass: string) => {
  let str = "";
  const numArr: number[] = encodedPass.split(" ").map((item) => parseInt(item));

  for (const n of numArr) {
    //PRIVATE KEY AND PUBLIC KEY GO HERE
    //Probably in the vercel thing
    const decoded = bigInt(n).modPow(22993121, 62615533);
    //@ts-expect-error
    str += String.fromCharCode(decoded);
  }
  return str;
};
