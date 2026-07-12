import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PropertyService } from "./property.service";



const createProperty = catchAsync(

async(req:Request,res:Response)=>{


const result =
await PropertyService.createProperty(
 req.body,
 req.user!.userId
);



sendResponse(res,{

 success:true,
 statusCode:201,
 message:"Property created successfully",
 data:result

});


}

);




const getAllProperties = catchAsync(

async(req:Request,res:Response)=>{


const result =
await PropertyService.getAllProperties();



sendResponse(res,{

success:true,
statusCode:200,
message:"Properties fetched successfully",
data:result

});


}

);




const getSingleProperty = catchAsync(

async(req:Request,res:Response)=>{


const { id } = req.params as { id:string };


const result =
await PropertyService.getSingleProperty(id);



sendResponse(res,{

success:true,
statusCode:200,
message:"Property fetched successfully",
data:result

});


}

);



export const PropertyController={

createProperty,
getAllProperties,
getSingleProperty

};