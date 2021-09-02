import { forgetPasswordTemplate } from "./../static/forgotPasswordTemplate";
import { PasswordSchema } from "./../Joi/AuthSchema";
import { ChangePasswordResolver } from "./GqlObjects/ChangePasswordResponse";
import { createForgetPasswordLink } from "./../utility/createForgotPasswordLink";
import { hash, verify } from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { AuthSchema } from "../Joi/AuthSchema";
import { User } from "../models/user";
import { ApolloContext } from "../types";
import { sendEmail } from "../utility/sendEmail";
import { verifyEmailHTMLGenerator } from "../static/verifyEmailTemplate";
import { COOKIE_NAME, SERVER_URL } from "./../constants";
import { createEmailLink } from "../utility/createVerifyEmailLink";
import { AuthResponse } from "./GqlObjects/AuthResponse";
import { LoginInput } from "./GqlObjects/loginInput";
import { RegisterInput } from "./GqlObjects/registerInput";
import { ForgotPasswordResponse } from "./GqlObjects/ForgotPasswordResponse";
import { createOTP } from "../utility/createOTP";
import { otpTemplate } from "../static/otpTemplate";
import { MasterPINResponse } from "./GqlObjects/MasterPINResponse";

//We need comments, this shit is getting hard to read
@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return User.find({});
  }

  //Me querry used as the entry point for the app
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: ApolloContext): Promise<User | void> {
    return User.findOne({
      relations: ["credentials"],
      where: {
        userID: req.session.userID,
      },
    });
  }

  //Registers the user if condititons are fullfilled
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
          masterPIN: await hash(registerInput.masterPIN),
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

    const link = await createEmailLink(SERVER_URL, redisClient, user.userID);

    const emailContent = verifyEmailHTMLGenerator(link);
    await sendEmail(
      registerInput.email,
      "Verify Your KPass12 Email",
      emailContent
    );

    req.session.userID = user.userID;
    return { user };
  }

  //Logs in the user and sends a session
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

  //Forgot password thingy
  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { PwdRedisClient: redisClient }: ApolloContext
  ): Promise<ForgotPasswordResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) return { error: "User doesn't exist", isSent: false };

    const link = await createForgetPasswordLink(redisClient, user.userID);
    const emailContent = forgetPasswordTemplate(link);
    await sendEmail(email, "Forgot Password", emailContent);
    return { isSent: true };
  }

  //Changes password throught forgot password
  @Mutation(() => ChangePasswordResolver)
  async forgotPasswordChange(
    @Arg("key") key: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { PwdRedisClient: redisClient }: ApolloContext
  ): Promise<ChangePasswordResolver> {
    const userID = await redisClient.get(key);
    if (!userID)
      return { error: "Provided Token is valid or expired.", isChanged: false };

    const { error } = PasswordSchema.validate({ password: newPassword });
    console.log(error);
    if (error) {
      return { error: "New Password isn't secure enough.", isChanged: false };
    }

    await redisClient.del(key);
    await User.update({ userID }, { password: await hash(newPassword) });
    return { isChanged: true };
  }

  //We first check if the user knows the password and send the thing that lets him change it
  @Mutation(() => ForgotPasswordResponse)
  async changePasswordInit(
    @Arg("password") password: string,
    @Ctx() { req, PwdRedisClient: redisClient }: ApolloContext
  ): Promise<ForgotPasswordResponse> {
    const user = await User.findOne({ where: { userID: req.session.userID } });

    if (user) {
      const verifyPassword = await verify(user.password, password);
      if (verifyPassword) {
        const token = await createOTP(redisClient, user.userID);
        const emailContent = otpTemplate(token);
        await sendEmail(user.email, "Change Password", emailContent);
        return { isSent: true };
      }
    }
    return { error: "Incorrect Password", isSent: false };
  }

  //We check if the tokens match and change the password
  @Mutation(() => ChangePasswordResolver)
  async changePasswordFinal(
    @Arg("key") key: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { PwdRedisClient: redisClient }: ApolloContext
  ): Promise<ChangePasswordResolver> {
    const userID = await redisClient.get(key);
    if (!userID)
      return {
        error: "Provided Token is not valid or has expired.",
        isChanged: false,
      };

    const { error } = PasswordSchema.validate({ password: newPassword });
    console.log(error);
    if (error) {
      return { error: "New Password isn't secure enough.", isChanged: false };
    }

    await redisClient.del(key);
    await User.update({ userID }, { password: await hash(newPassword) });
    return { isChanged: true };
  }

  //This verifies if the masterPIN is correct
  @Mutation(() => MasterPINResponse)
  async verifyMasterPIN(
    @Arg("masterPIN") masterPIN: string,
    @Ctx() { req }: ApolloContext
  ): Promise<MasterPINResponse> {
    const user = await User.findOne({ where: { userID: req.session.userID } });

    if (!user) {
      return {
        error: "User Not Found. Try making an account.",
        isValid: false,
      };
    }

    const verifyMasterPIN = await verify(user.masterPIN, masterPIN);

    if (!verifyMasterPIN) {
      return { error: "Wrong Master PIN. Try Again.", isValid: false };
    }

    return { isValid: true };
  }

  //This changes the master PIN
  @Mutation(() => MasterPINResponse)
  async changeMasterPIN(
    @Arg("password") password: string,
    @Arg("masterPIN") masterPIN: string,
    @Ctx() { req }: ApolloContext
  ): Promise<MasterPINResponse> {
    const user = await User.findOne({ where: { userID: req.session.userID } });
    if (!user) {
      return {
        error: "User Not Found. Try making an account.",
        isValid: false,
      };
    }
    const { password: dbpassword, userID } = user;

    const verifyPassword = await verify(dbpassword, password);

    if (!verifyPassword) {
      return { error: "Wrong Password. Try Again.", isValid: false };
    }

    await User.update({ userID }, { masterPIN: await hash(masterPIN) });
    return { isValid: true };
  }
}
