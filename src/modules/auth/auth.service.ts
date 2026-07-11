import bcrypt from "bcryptjs";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";


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

const loginUser = async (payload: ILoginUser) => {

  // 1. Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  });


  if (!user) {
    throw new Error("User not found");
  }


  // 2. Compare password

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );


  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }


  // 3. Create JWT token

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d"
    }
  );


  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };

};



export const AuthService = {
  registerUser,
  loginUser
};