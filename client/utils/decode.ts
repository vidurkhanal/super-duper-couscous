import { PRIVATE_KEY } from "../constants";

const decode = (encodedPass: string, bigInt: any) => {
  let str = "";
  const e = bigInt(PRIVATE_KEY);

  const numArr: number[] = encodedPass.split(" ").map((item) => parseInt(item));

  for (const n of numArr) {
    const decoded = bigInt(n).modPow(e, "62615533");
    str += String.fromCharCode(decoded);
  }
  return str;
};

export const hey = () => {
  return decode;
};
