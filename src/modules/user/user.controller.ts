import { Request, Response } from "express";
import { userService } from "./user.service";



const createUser = async(req:Request,res:Response)=>{

    try{

        const result = await userService.createUser(req.body);

        res.status(201).json({
            success:true,
            data:result
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:"Something went wrong"
        });

    }

};




const getUsers = async(req:Request,res:Response)=>{

    const result = await userService.getUsers();

    res.json({
        success:true,
        data:result
    });

};





// Current logged in user profile
const getMe = async(
    req:Request,
    res:Response
)=>{


    res.status(200).json({

        success:true,

        message:"User profile fetched successfully",

        data:req.user

    });


};





export const userController = {

    createUser,

    getUsers,

    getMe

};