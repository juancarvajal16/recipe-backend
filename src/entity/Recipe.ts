import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn} from 'typeorm'
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { User } from "./User"
import { Category } from './Category';

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description!: string;

  @Field(type => [String], { nullable: true })
  @Column("simple-array", {array: true, nullable: true})
  ingredients!: string[];

  @Field(type => Int, { nullable: true })
  @Column("int", { nullable: true })
  categoryId!: number;

  @Field(type => Category, { nullable: true })
  @ManyToOne(type => Category, category => category.recipes)
  @JoinColumn({name: "categoryId"})
  category!: Category;

  @Field(type => Int, { nullable: true })
  @Column("int", { nullable: true })
  creatorId!: number;

  @Field(type => User, { nullable: true })
  @ManyToOne(type => User)
  @JoinColumn({name: "creatorId"})
  creator!: User;
}