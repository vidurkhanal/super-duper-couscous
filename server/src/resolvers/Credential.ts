import { CredentialSchema } from "../Joi/CredentialsSchema";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Credential } from "../models/credential";
import { User } from "../models/user";
import { ApolloContext } from "../types";
import { encode } from "../utility/encode";
import { CredentialResponse } from "./GqlObjects/CredentialResponse";
import { passwordStrengthCalculator } from "../utility/passwordStrength";

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
    //
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
}
