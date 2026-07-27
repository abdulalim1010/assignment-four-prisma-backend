export interface INews {
  title: string;
  description: string;
  content: string;
  image?: string;
  category: string;
  isPremium?: boolean;
  authorId: string;
}