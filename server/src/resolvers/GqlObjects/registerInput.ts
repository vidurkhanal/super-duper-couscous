import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
