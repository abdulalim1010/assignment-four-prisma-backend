import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";


const globalErrorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {


    let statusCode = 500;
    let message = "Internal Server Error";


    if(error instanceof AppError){

        statusCode = error.statusCode;
        message = error.message;

    }
    else if(error.name === "PrismaClientKnownRequestError"){

        statusCode = 400;
        message = "Database Error";

    }
    else if(error.name === "JsonWebTokenError"){

        statusCode = 401;
        message = "Invalid Token";

    }
    else if(error.name === "TokenExpiredError"){

        statusCode = 401;
        message = "Token Expired";

    }


    res.status(statusCode).json({

        success:false,

        statusCode,

        message,

        error:error.message

    });

};


export default globalErrorHandler;