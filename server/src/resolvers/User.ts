import { User } from "../models/user";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@InputType()
class NewRecipeInput {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await User.find({});
  }

  @Mutation(() => Boolean)
  async registerUser(@Arg("registerInput") registerInput: NewRecipeInput) {
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          fullName: registerInput.fullName,
          email: registerInput.email,
          password: registerInput.password,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (e) {
      return false;
    }
    console.log(user);
    return true;
  }
}
