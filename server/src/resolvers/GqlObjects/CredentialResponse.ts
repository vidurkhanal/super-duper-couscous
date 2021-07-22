import { Field, ObjectType } from "type-graphql";
import { Credential } from "../../models/credential";

@ObjectType()
export class CredentialResponse {
  @Field({ nullable: true })
  error?: string;

  @Field(() => Credential, { nullable: true })
  credential?: Credential;
}
