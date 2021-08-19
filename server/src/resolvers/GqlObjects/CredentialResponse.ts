import { User } from "../../models/user";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CredentialResponse {
  @Field({ nullable: true })
  error?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
