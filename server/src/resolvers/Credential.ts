import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { CredentialSchema } from "../Joi/CredentialsSchema";
import { Credential } from "../models/credential";
import { User } from "../models/user";
import { ApolloContext } from "../types";
import { encode } from "../utility/encode";
import { passwordStrengthCalculator } from "../utility/passwordStrength";
import { CredentialResponse } from "./_types";

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

    // let siteLogo;
    // try {
    //   const { data } = await axios.get(ICON_FETCHER + siteName, {
    //     timeout: 10000,
    //   });
    //   //@ts-expect-error
    //   const sortedData = data?.sort((a, b) => b.size - a.size);
    //   siteLogo = sortedData[0].url;
    // } catch {}

    let siteLogo =
      "https://www.freepnglogos.com/uploads/logo-website-png/logo-website-world-wide-web-svg-png-icon-download-10.png";

    const encodedPass = encode(password);
    const userID = req.session.userID;

    console.log(encodedPass);

    if (!userID) {
      return { error: "User Not Authenticated" };
    }

    const user = (await User.findOne({
      where: { userID },
    })) as User;
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
      user: (await User.findOne({
        relations: ["credentials"],
        where: {
          userID: req.session.userID,
        },
      })) as User,
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
        user: (await User.findOne({
          relations: ["credentials"],
          where: {
            userID: req.session.userID,
          },
        })) as User,
      };
    } catch (e) {
      console.log(e);
      return { error: "Internal Server Error" };
    }
  }
}
