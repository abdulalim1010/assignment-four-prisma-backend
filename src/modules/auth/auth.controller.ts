import { Request, Response } from "express";
import { AuthService } from "./auth.service";


const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


const loginUser = async (
  req: Request,
  res: Response
) => {

  try {

    const result = await AuthService.loginUser(
      req.body
    );


    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });


  } catch(error:any){

    res.status(400).json({
      success:false,
      message:error.message
    });

  }

};

export const AuthController = {
  registerUser,
  loginUser
};