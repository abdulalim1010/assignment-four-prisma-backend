export interface IProperty {
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  image?: string;
  categoryId: string;
}