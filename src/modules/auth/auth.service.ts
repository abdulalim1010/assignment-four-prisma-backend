import bcrypt from "bcryptjs";
import { IRegisterUser } from "./auth.interface";
import { prisma } from "../../lib/prisma";


const registerUser = async (payload: IRegisterUser) => {

    const isUserExist = await prisma.user.findUnique({
        where:{
            email:payload.email
        }
    });

    if(isUserExist){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(
        payload.password,
        10
    );

    const user = await prisma.user.create({
        data:{
            ...payload,
            password:hashedPassword
        }
    });

    return user;
};

export const AuthService = {
    registerUser
};