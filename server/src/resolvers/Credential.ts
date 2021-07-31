import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Credential } from "../models/credential";
import { encode } from "../utility/encode";
import { User } from "../models/user";
import { ApolloContext } from "../types";
import { CredentialResponse } from "./GqlObjects/CredentialResponse";

@Resolver()
export class CredentialResolver {
  @Mutation(() => CredentialResponse)
  async addCredential(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: ApolloContext
  ): Promise<CredentialResponse> {
    let credential;
    const encodedPass = encode(password);
    const userID = req.session.userID;

    console.log(userID);
    if (!userID) {
      return { error: "User Not Authenticated", credential };
    }

    const user = await User.findOne({
      where: { userID },
    });

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Credential)
      .values({
        email,
        password: encodedPass,
        user,
      })
      .returning("*")
      .execute();

    credential = result.raw[0] as Credential;
    return { credential };
  }

  @Query(() => [Credential], { nullable: true })
  async getCredentials(@Ctx() { req }: ApolloContext) {
    try {
      return getConnection().query(
        `SELECT * FROM Credential WHERE "userID" = '${req.session.userID}'`
      );
    } catch (err) {
      console.log(err);
    }
  }
}
