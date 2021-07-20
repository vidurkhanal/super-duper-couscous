import { Field, InputType } from "type-graphql";

@InputType()
export class registerInput {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
