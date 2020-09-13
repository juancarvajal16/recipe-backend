import { Resolver, Query, Mutation, Arg, Int, Ctx, Authorized, ObjectType, Field, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import bcrypt from 'bcryptjs';
import { MyContext } from "../MyContext";
import {isAuth} from '../isAuth';
import { sign } from 'jsonwebtoken';

@ObjectType()
class LoginResponse{
    @Field()
    token!: string
}

@Resolver()
export class UserResolver {

  @UseMiddleware(isAuth)
  @Query(() => String)
  hello(){
   return "hello world"
  }

  @Query(() => [User])
  async getUsers(){
    return await User.find()
  }

  @Query(() => User)
  async getOneUser(@Arg("id", type=>Int) id: number){
    return await User.findOne({ where: { id }})
  }

  @Mutation(() => User)
  async signUp(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = User.create({name, email, password:hashedPassword});
    return await newUser.save();
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ) {
    const user = await User.findOne({ where: { email } })
    if(!user){
        throw new Error("User not found");
    }
    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
        throw new Error("Invalid password");
    }

    //Login success
    const secret = process.env.JWT_SECRET_KEY!;
    const token = sign({ userId: user.id }, secret, { expiresIn:"1d" })
    return { token }; 
  }

}