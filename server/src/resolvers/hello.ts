import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello(@Arg("name") name: string) {
    return "hello " + name;
  }
}
