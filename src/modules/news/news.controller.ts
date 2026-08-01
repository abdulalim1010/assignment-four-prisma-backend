import { Request, Response } from "express";
import { NewsService } from "./news.service";

const createNews = async (
  req: Request,
  res: Response
) => {


  const result = await NewsService.createNews(
    req.body,
    req.user!.userId
  );


  res.status(201).json({
    success: true,
    message: "News created successfully",
    data: result,
  });

};

const getAllNews = async (req: Request, res: Response) => {
  const result = await NewsService.getAllNews();

  res.json({
    success: true,
    data: result,
  });
};

const getPublicNews = async (req: Request, res: Response) => {
  const result = await NewsService.getPublicNews();

  res.json({
    success: true,
    data: result,
  });
};

const getPremiumNews = async (
  req: Request,
  res: Response
) => {

  if (!req.user?.isPremium && req.user.role !== "ADMIN") {
    throw new AppError(
      403,
      "Premium subscription required"
    );
  }

  const result = await NewsService.getPremiumNews();

  res.status(200).json({
    success: true,
    message: "Premium news fetched successfully",
    data: result,
  });
};

const getSingleNews = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await NewsService.getSingleNews(id);

  res.json({
    success: true,
    data: result,
  });
};

const updateNews = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await NewsService.updateNews(id, req.body);

  res.json({
    success: true,
    message: "News updated successfully",
    data: result,
  });
};

//premium or not
const togglePremium = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id as string;



  const result = await NewsService.togglePremium(id);

  res.json({
    success: true,
    message: "Premium status updated successfully",
    data: result,
  });
};

const deleteNews = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await NewsService.deleteNews(id);

  res.json({
    success: true,
    message: "News deleted successfully",
  });
};

export const NewsController = {
  createNews,
  getAllNews,
  getPublicNews,                                                                          
  getPremiumNews,
  getSingleNews,
  updateNews,                                                             
  deleteNews,
  togglePremium,                                                                
};