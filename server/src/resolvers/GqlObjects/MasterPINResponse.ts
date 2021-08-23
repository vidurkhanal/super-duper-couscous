import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MasterPINResponse {
  @Field({ nullable: true })
  error?: string;

  @Field()
  isValid: boolean;
}
