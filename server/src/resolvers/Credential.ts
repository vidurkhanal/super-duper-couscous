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

    //Fetch this from the context's session object or the cookie I dont know how sessions work
    //Try catch is reduntant here
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
  //We don't need a try catch as the user will surely exist
  async getCredentials(@Ctx() { req }: ApolloContext) {
    return getConnection().query(
      `SELECT * FROM Credential WHERE "userID" = '${req.session.userID}'`
    );
  }
}
