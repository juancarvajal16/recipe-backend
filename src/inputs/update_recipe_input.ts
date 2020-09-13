import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateRecipeInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [String], { nullable: true })
  ingredients?: string[];

  @Field({ nullable: true })
  category?: string;
}