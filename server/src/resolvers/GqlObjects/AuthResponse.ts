import { User } from "../../models/user";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  error?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
