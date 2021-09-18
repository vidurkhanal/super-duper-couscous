import { User } from "../models/user";
import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  error?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class ChangePasswordResolver {
  @Field({ nullable: true })
  error?: string;

  @Field()
  isChanged: boolean;
}

@ObjectType()
export class CredentialResponse {
  @Field({ nullable: true })
  error?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class ForgotPasswordResponse {
  @Field({ nullable: true })
  error?: string;

  @Field()
  isSent: boolean;
}

@InputType()
export class RegisterInput {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class MasterPINResponse {
  @Field({ nullable: true })
  error?: string;

  @Field()
  isValid: boolean;
}

@ObjectType()
export class createMasterPINResponse {
  @Field({ nullable: true })
  error?: string;

  @Field()
  isSuccessful: boolean;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
