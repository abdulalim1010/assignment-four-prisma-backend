import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { INews } from "./news.interface";

const createNews = async (
  payload: INews,
  userId: string
) => {

 return prisma.news.create({

   data: {

     ...payload,

     authorId: userId,

   }

 });

};
const getAllNews = async () => {
  return await prisma.news.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getPublicNews = async (
  search?: string
) => {
  return prisma.news.findMany({
    where: {
      isPremium: false,
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
const getPremiumNews = async (
  search?: string
) => {
  return prisma.news.findMany({
    where: {
      isPremium: true,
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};;

const getSingleNews = async (id: string) => {
  return await prisma.news.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
};

const updateNews = async (id: string, payload: Partial<INews>) => {
  return await prisma.news.update({
    where: {
      id,
    },
    data: payload,
  });
};


//premium or not
const togglePremium = async (
  id: string
) => {

  const news = await prisma.news.findUnique({
    where: { id },
  });

  if (!news) {
    throw new AppError(404, "News not found");
  }

  return prisma.news.update({
    where: {
      id,
    },
    data: {
      isPremium: !news.isPremium,
    },
  });

};

const deleteNews = async (id: string) => {
  return await prisma.news.delete({
    where: {
      id,
    },
  });
};

export const NewsService = {
  createNews,
  getAllNews,
  getPublicNews,
  getPremiumNews,
  getSingleNews,
  updateNews,
  deleteNews,
  togglePremium,
};