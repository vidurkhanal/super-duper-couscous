import bigInt from "big-integer";
import { PUBLIC_KEY, ENCRYPTION_KEY } from "../constants";

export const encode = (password: string) => {
  let encodedPassword: string = "";
  for (const s of password) {
    const encoded = bigInt(s.charCodeAt(0)).modPow(ENCRYPTION_KEY, PUBLIC_KEY);
    encodedPassword += `${encoded} `;
  }
  return encodedPassword.trimEnd();
};
