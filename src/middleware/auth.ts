import { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";
import  { JwtPayload } from "jsonwebtoken";

import config from "../config";

import AppError from "../errors/AppError";
import { prisma } from "../lib/prisma";
import catchAsync from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";


declare global {

    namespace Express {

        interface Request {

            user?: {
                userId:string;
                email:string;
                role:Role;
                name:string;
            }

        }

    }

}



export const auth = (...requiredRoles:Role[]) => {


return catchAsync(

async(
req:Request,
res:Response,
next:NextFunction
)=>{


const token =
req.cookies?.accessToken ||
(
req.headers.authorization?.startsWith("Bearer")
?
req.headers.authorization.split(" ")[1]
:
undefined
);



if(!token){

    throw new AppError(
        401,
        "You are not authorized"
    );

}



const decoded = jwtUtils.verifyToken(
  token,
  config.jwt_access_secret
) as JwtPayload;




const {
    userId,
    email,
    role,
    name
}=decoded;



if(
requiredRoles.length &&
!requiredRoles.includes(role)
){

throw new AppError(
    403,
    "You don't have permission"
);

}



const user = await prisma.user.findUnique({

    where:{
        id:userId
    }

});



if(!user){

    throw new AppError(
        404,
        "User not found"
    );

}



if(user.status==="BLOCKED"){

    throw new AppError(
        403,
        "Your account is blocked"
    );

}



req.user={
    userId,
    email,
    role,
    name
};



next();


}

)

}