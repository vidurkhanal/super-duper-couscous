import { CredentialSchema } from "../Joi/CredentialsSchema";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Credential } from "../models/credential";
import { User } from "../models/user";
import { ApolloContext } from "../types";
import { encode } from "../utility/encode";
import { CredentialResponse } from "./GqlObjects/CredentialResponse";
import { passwordStrengthCalculator } from "../utility/passwordStrength";
import axios from "axios";
import { ICON_FETCHER } from "../constants";

@Resolver()
export class CredentialResolver {
  @Mutation(() => CredentialResponse)
  async addCredential(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("siteName") siteName: string,
    @Ctx() { req }: ApolloContext
  ): Promise<CredentialResponse> {
    const { error: JoiError } = CredentialSchema.validate({
      email,
      password,
      siteName,
    });

    if (JoiError) {
      return {
        error: JoiError.message,
      };
    }
    let siteLogo;

    try {
      const { data } = await axios.get(ICON_FETCHER + siteName, {
        timeout: 30000,
      });
      //@ts-expect-error
      const sortedData = data?.sort((a, b) => b.size - a.size);
      siteLogo = sortedData[0].url;
    } catch {}

    const encodedPass = encode(password);
    const userID = req.session.userID;

    if (!userID) {
      return { error: "User Not Authenticated" };
    }

    const user = await User.findOne({
      where: { userID },
    });
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Credential)
      .values({
        email,
        password: encodedPass,
        user,
        siteName,
        siteLogo,
        strength: passwordStrengthCalculator(password),
      })
      .returning("*")
      .execute();

    return {
      user: await User.findOne({
        relations: ["credentials"],
        where: {
          userID: req.session.userID,
        },
      }),
    };
  }

  @Mutation(() => CredentialResponse)
  async delCredentials(
    @Arg("credentialID") credentialID: string,
    @Ctx() { req }: ApolloContext
  ): Promise<CredentialResponse> {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Credential)
        .where(`credentialID= '${credentialID}'`)
        .execute();

      return {
        user: await User.findOne({
          relations: ["credentials"],
          where: {
            userID: req.session.userID,
          },
        }),
      };
    } catch (e) {
      console.log(e);
      return { error: "Internal Server Error" };
    }
  }
}
