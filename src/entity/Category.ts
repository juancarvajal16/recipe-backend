import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Recipe } from "./Recipe";

@ObjectType()
@Entity()
export class Category extends BaseEntity {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name!: string;

  @Field(type => [Recipe])
  @OneToMany(type => Recipe, recipe => recipe.category)
  recipes!: Recipe[];
}