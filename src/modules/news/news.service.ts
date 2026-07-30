import { prisma } from "../../lib/prisma";
import { INews } from "./news.interface";

const createNews = async (payload: INews) => {
  const result = await prisma.news.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
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

const getPublicNews = async () => {
  return await prisma.news.findMany({
    where: {
      isPremium: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getPremiumNews = async () => {

  return await prisma.news.findMany({
    where:{
      isPremium:true,
    },
    orderBy:{
      createdAt:"desc",
    },
  });

};

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
};