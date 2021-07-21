import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Credential } from "../models/credential";
import { encode } from "../utility/encode";
import { User } from "../models/user";

@Resolver()
export class CredentialResolver {
  @Mutation(() => Credential)
  async addCredential(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const encodedPass = encode(password);

    //Fetch this from the context's session object or the cookie I dont know how sessions work
    //Try catch is reduntant here
    const user = await User.findOne({});

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

    return result.raw[0];
  }

  @Query(() => [Credential], { nullable: true })
  //We don't need a try catch as the user will surely exist
  async getCredentials(@Arg("userID") userID: string) {
    return getConnection().query(
      `SELECT * FROM Credential WHERE "userID" = '${userID}'`
    );
  }
}
