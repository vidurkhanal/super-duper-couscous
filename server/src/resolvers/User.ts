import { User } from "../models/user";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { hash, verify } from "argon2";
import { AuthSchema } from "../Joi/AuthSchema";
import { registerInput } from "./GqlObjects/registerInput";
import { loginInput } from "./GqlObjects/loginInput";
import { AuthResponse } from "./GqlObjects/AuthResponse";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await User.find({});
  }

  @Mutation(() => AuthResponse)
  async registerUser(
    @Arg("registerInput") registerInput: registerInput
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
      user = result.raw[0];
    } catch (e) {
      if (e.code === "23505") {
        return { error: "Provided Email Already Exists.", user };
      }
      return { error: "Some Internal Error Occurred.Try Again.", user };
    }
    console.log(user);
    return { user };
  }

  @Mutation(() => AuthResponse)
  async loginUser(
    @Arg("loginInput") loginInput: loginInput
  ): Promise<AuthResponse> {
    const user = await User.findOne({ where: { email: loginInput.email } });
    if (!user) {
      return { error: "User Not Found." };
    }
    const verifyPassword = await verify(user.password, loginInput.password);
    if (!verifyPassword) {
      return { error: "Password Doesn't Match Our Files." };
    }

    return { user };
  }
}
