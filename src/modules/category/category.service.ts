import { prisma } from "../../lib/prisma";
import { ICategory } from "./category.interface";



const createCategory = async (
  payload: ICategory
) => {

  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};


const getAllCategories = async () => {

  const result = await prisma.category.findMany();

  return result;
};


const getSingleCategory = async (
  id: string
) => {

  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return result;
};


const deleteCategory = async (
  id: string
) => {

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};


export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
};