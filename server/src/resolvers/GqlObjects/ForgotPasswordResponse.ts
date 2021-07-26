import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ForgotPasswordResponse {
  @Field({ nullable: true })
  error?: string;

  @Field()
  isSent: boolean;
}
