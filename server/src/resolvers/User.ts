import { hash, verify } from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { AuthSchema } from "../Joi/AuthSchema";
import { User } from "../models/user";
import { ApolloContext } from "../types";
import { sendEmail } from "../utility/sendEmail";
import { verifyEmailHTMLGenerator } from "../static/verifyEmailTemplate";
import { COOKIE_NAME, PAGE_URL } from "./../constants";
import { createEmailLink } from "./../utility/createEmailLink";
import { AuthResponse } from "./GqlObjects/AuthResponse";
import { LoginInput } from "./GqlObjects/loginInput";
import { RegisterInput } from "./GqlObjects/registerInput";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return User.find({});
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: ApolloContext): Promise<User | void> {
    return User.findOne({
      relations: ["credentials"],
      where: {
        userID: req.session.userID,
      },
    });
  }

  @Mutation(() => AuthResponse)
  async registerUser(
    @Arg("registerInput") registerInput: RegisterInput,
    @Ctx() { req, redisClient }: ApolloContext
  ): Promise<AuthResponse> {
    const { error } = AuthSchema.validate(registerInput);
    let user;
    console.log(error);
    if (error) {
      if (error.message.includes('"email" must be a valid email')) {
        return {
          error: "Email Has Been Badly Formatted. Please retry with new email.",
          user,
        };
      }

      if (error.message.includes("fails to match the required pattern")) {
        return {
          error:
            "Your Password is not strong enough. Try Our Free Password Generator.",
          user,
        };
      }

      if (
        error.message.includes(
          '"fullName" length must be at least 3 characters long'
        )
      ) {
        return {
          error: "Please Check Your Name.",
          user,
        };
      }

      return { error: error?.message, user };
    }
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          fullName: registerInput.fullName,
          email: registerInput.email,
          password: await hash(registerInput.password),
        })
        .returning("*")
        .execute();
      user = result.raw[0] as User;
    } catch (e) {
      if (e.code === "23505") {
        return { error: "Provided Email Already Exists.", user };
      }
      return { error: "Some Internal Error Occurred.Try Again.", user };
    }

    const link = await createEmailLink(PAGE_URL, redisClient, user.userID);

    const emailContent = verifyEmailHTMLGenerator(link);
    await sendEmail("", "Verify Your KPass12 Email", emailContent);

    req.session.userID = user.userID;
    return { user };
  }

  @Mutation(() => AuthResponse)
  async loginUser(
    @Arg("loginInput") loginInput: LoginInput,
    @Ctx() { req }: ApolloContext
  ): Promise<AuthResponse> {
    const user = await User.findOne({ where: { email: loginInput.email } });
    if (!user) {
      return { error: "User Not Found. Try making an account." };
    }
    const verifyPassword = await verify(user.password, loginInput.password);
    if (!verifyPassword) {
      return { error: "Wrong Password. Try Again." };
    }

    req.session.userID = user.userID;
    return { user };
  }

  @Mutation(() => Boolean)
  logoutUser(@Ctx() { req, res }: ApolloContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
