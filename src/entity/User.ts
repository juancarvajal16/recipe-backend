import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name!: string;

  @Field()
  @Column()
  email!: string;

  @Column("text", { unique: true })
  password!: string;
}