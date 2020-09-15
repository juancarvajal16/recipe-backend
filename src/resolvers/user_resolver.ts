import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { User } from "../entity/User";
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@ObjectType()
class LoginResponse{
    @Field()
    token!: string
}

@Resolver()
export class UserResolver {

  @Query(() => [User])
  async users(){
    return await User.find()
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