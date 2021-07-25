import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ChangePasswordResolver {
  @Field({ nullable: true })
  error?: string;

  @Field()
  isChanged: boolean;
}
