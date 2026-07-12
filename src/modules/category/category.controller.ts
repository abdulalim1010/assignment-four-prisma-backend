import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";


const createCategory = catchAsync(
  async (req: Request, res: Response) => {

    const result =
      await CategoryService.createCategory(req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Category created successfully",
      data: result,
    });

  }
);



const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {

    const result =
      await CategoryService.getAllCategories();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Categories fetched successfully",
      data: result,
    });

  }
);



const getSingleCategory = catchAsync(
  async (req: Request, res: Response) => {

    const { id } = req.params;

    const result =
      await CategoryService.getSingleCategory(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Category fetched successfully",
      data: result,
    });

  }
);



const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {

    const { id } = req.params;

    const result =
      await CategoryService.deleteCategory(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Category deleted successfully",
      data: result,
    });

  }
);



export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
};