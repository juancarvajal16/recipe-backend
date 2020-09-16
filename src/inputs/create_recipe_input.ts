import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateRecipeInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  description!: string;

  @Field(type => [String], { nullable: true })
  ingredients!: string[];

  @Field(type=>Int, { nullable: true })
  categoryId!: number;
}