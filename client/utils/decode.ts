import { PRIVATE_KEY } from "../constants";
import bigInt from "big-integer";

export const decode = (encodedPass: string) => {
  let str = "";
  const e = bigInt(PRIVATE_KEY);

  const numArr: number[] = encodedPass.split(" ").map((item) => parseInt(item));

  for (const n of numArr) {
    const decoded = bigInt(n).modPow(e, "62615533");
    // @ts-expect-error
    str += String.fromCharCode(decoded);
  }
  return str;
};

// export const hey = () => {
//   return decode;
// };
