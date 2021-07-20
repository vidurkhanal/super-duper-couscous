import { Field, InputType } from "type-graphql";

@InputType()
export class loginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
