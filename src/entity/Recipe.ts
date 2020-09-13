import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn} from 'typeorm'
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { User } from "./User"

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  category!: string;

  @Field(type => Int, { nullable: true })
  @Column("int", { nullable: true })
  creatorId!: number;

  @Field(type => User)
  @ManyToOne(type => User, user => user.recipes)
  @JoinColumn({name: "creatorId"})
  creator!: User;
}