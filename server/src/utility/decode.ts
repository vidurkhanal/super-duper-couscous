import bigInt from "big-integer";
import { PRIVATE_KEY, PUBLIC_KEY } from "../constants";

export const decode = (encodedPass: string) => {
  let str = "";
  const numArr: number[] = encodedPass.split(" ").map((item) => parseInt(item));

  for (const n of numArr) {
    const decoded = bigInt(n).modPow(PRIVATE_KEY, PUBLIC_KEY);
    //@ts-expect-error
    str += String.fromCharCode(decoded);
  }
  return str;
};
