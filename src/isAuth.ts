import { MiddlewareFn } from "type-graphql";
import { verify } from 'jsonwebtoken';
import { MyContext } from "./MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization']
    if(!authorization){
        throw new Error('Access denied, please login to continue')
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET_KEY!)
        context.payload = payload as any;

    } catch(err){
        console.log(err);
        throw new Error('Access denied, please login to continue')
    }

    return next()
}