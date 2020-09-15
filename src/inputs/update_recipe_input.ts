import { InputType, Field, Int } from 'type-graphql';
import { Category } from '../entity/Category';

@InputType()
export class UpdateRecipeInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [String], { nullable: true })
  ingredients?: string[];

  @Field(type=>Int, { nullable: true })
  categoryId?: number;
}